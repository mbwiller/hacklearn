// src/utils/migrateLocalData.ts
import { supabase } from '../lib/supabase';

export async function migrateLocalData(userId: string) {
  // Check if migration already done
  const migrationKey = `hacklearn_migrated_${userId}`;
  if (localStorage.getItem(migrationKey)) return;

  // Get local progress data
  const localProgress = JSON.parse(
    localStorage.getItem('hacklearn_progress') || '{}'
  );
  
  if (Object.keys(localProgress).length === 0) {
    localStorage.setItem(migrationKey, 'true');
    return;
  }

  // Migrate to Supabase
  const migrations = Object.entries(localProgress).map(
    ([moduleId, completed]) => ({
      user_id: userId,
      module_id: parseInt(moduleId),
      status: completed ? 'completed' : 'in_progress',
      completed_at: completed ? new Date().toISOString() : null,
    })
  );

  const { error } = await supabase
    .from('module_progress')
    .upsert(migrations);

  if (!error) {
    // Clear local data after successful migration
    localStorage.removeItem('hacklearn_progress');
    localStorage.setItem(migrationKey, 'true');
  }
}