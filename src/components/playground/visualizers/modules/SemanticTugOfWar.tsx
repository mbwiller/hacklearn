import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import type { ContextWindowState } from '@/types/context-visualizer';

interface SemanticTugOfWarProps {
  state: ContextWindowState;
  width?: number;
  height?: number;
}

export const SemanticTugOfWar = ({
  state,
  width = 800,
  height = 400
}: SemanticTugOfWarProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate vector forces for each token
  const vectorField = useMemo(() => {
    const systemTokens = state.tokens.filter(t => t.role === 'system');
    const userTokens = state.tokens.filter(t => t.role === 'user');

    // System centroid (left side)
    const systemCentroid = {
      x: width * 0.25,
      y: height * 0.5,
    };

    // User/injection centroid (right side)
    const userCentroid = {
      x: width * 0.75,
      y: height * 0.5,
    };

    return state.tokens.map((token) => {
      // Calculate pull forces
      const systemPull = token.role === 'system' ? 1.0 :
                        systemTokens.length > 0 ? (token.accumulatedAttention * 0.5) : 0;

      const userPull = token.role === 'user' ? 1.0 :
                      userTokens.length > 0 ? (1.0 - systemPull) : 0;

      // Compute vector direction
      const dx = (userCentroid.x - systemCentroid.x) * (userPull - systemPull);
      const dy = 0; // Horizontal only for simplicity

      // Position based on accumulated attention
      const x = systemCentroid.x + (token.accumulatedAttention * (width * 0.5));
      const y = height * 0.5 + (Math.random() - 0.5) * 100; // Add jitter

      return {
        token,
        position: { x, y },
        force: { dx, dy },
        magnitude: Math.sqrt(dx * dx + dy * dy),
      };
    });
  }, [state, width, height]);

  // Render vector field using D3
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous

    // Draw centroids
    const centroidGroup = svg.append('g').attr('class', 'centroids');

    // System centroid (left, cyan)
    centroidGroup.append('circle')
      .attr('cx', width * 0.25)
      .attr('cy', height * 0.5)
      .attr('r', 30)
      .attr('fill', 'none')
      .attr('stroke', 'rgb(34, 211, 238)')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5);

    centroidGroup.append('text')
      .attr('x', width * 0.25)
      .attr('y', height * 0.5 - 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(34, 211, 238)')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .text('SYSTEM');

    // User centroid (right, emerald)
    centroidGroup.append('circle')
      .attr('cx', width * 0.75)
      .attr('cy', height * 0.5)
      .attr('r', 30)
      .attr('fill', 'none')
      .attr('stroke', 'rgb(16, 185, 129)')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5);

    centroidGroup.append('text')
      .attr('x', width * 0.75)
      .attr('y', height * 0.5 - 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(16, 185, 129)')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .text('USER INPUT');

    // Draw force vectors
    const vectorGroup = svg.append('g').attr('class', 'vectors');

    vectorField.forEach(({ token, position, force, magnitude }) => {
      // Arrow line
      vectorGroup.append('line')
        .attr('x1', position.x)
        .attr('y1', position.y)
        .attr('x2', position.x + force.dx * 0.5)
        .attr('y2', position.y + force.dy * 0.5)
        .attr('stroke', magnitude > 50 ? 'rgb(239, 68, 68)' : 'rgb(148, 163, 184)')
        .attr('stroke-width', magnitude > 50 ? 2 : 1)
        .attr('opacity', 0.7)
        .attr('marker-end', 'url(#arrowhead)');

      // Token circle
      vectorGroup.append('circle')
        .attr('cx', position.x)
        .attr('cy', position.y)
        .attr('r', token.isHeavyHitter ? 6 : 4)
        .attr('fill', token.role === 'system' ? 'rgb(34, 211, 238)' :
                     token.role === 'user' ? 'rgb(16, 185, 129)' :
                     'rgb(148, 163, 184)')
        .attr('opacity', 0.8);

      // Token label
      if (token.isHeavyHitter) {
        vectorGroup.append('text')
          .attr('x', position.x)
          .attr('y', position.y - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .attr('font-size', 10)
          .attr('font-family', 'monospace')
          .text(token.text.slice(0, 8));
      }
    });

    // Define arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('refX', 9)
      .attr('refY', 3)
      .attr('orient', 'auto')
      .append('polygon')
      .attr('points', '0 0, 10 3, 0 6')
      .attr('fill', 'rgb(148, 163, 184)');

  }, [vectorField, width, height]);

  // Injection warning overlay
  const showWarning = state.injectionDetected || state.taskDriftScore > 0.5;

  return (
    <div className="relative">
      {/* Warning banner */}
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-t-xl p-3 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-red-400 font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Potential Prompt Injection Detected (Drift: {(state.taskDriftScore * 100).toFixed(1)}%)
          </div>
        </motion.div>
      )}

      {/* SVG Canvas */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span>System Tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>User Tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-500" />
          <span>High Tension (Potential Attack)</span>
        </div>
      </div>
    </div>
  );
};
