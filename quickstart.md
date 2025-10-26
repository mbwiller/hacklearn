# ⚡ Quick Start Guide - Get Running in 60 Seconds

## For Mac/Linux Users

1. Open Terminal
2. Navigate to this directory:
   ```bash
   cd path/to/hacklearn-platform
   ```
3. Make the start script executable:
   ```bash
   chmod +x start.sh
   ```
4. Run the start script:
   ```bash
   ./start.sh
   ```
5. Open your browser to: **http://localhost:8080**

## For Windows Users

1. Open Command Prompt or PowerShell
2. Navigate to this directory:
   ```cmd
   cd path\to\hacklearn-platform
   ```
3. Double-click `start.bat` OR run:
   ```cmd
   start.bat
   ```
4. Open your browser to: **http://localhost:8080**

## Manual Method (All Platforms)

If the scripts don't work:

```bash
docker-compose up -d
```

Then open: **http://localhost:8080**

## Stop the Platform

```bash
docker-compose down
```

## Troubleshooting

### "Docker is not running"
- Open Docker Desktop and wait for it to start
- Try again after Docker is ready

### "Port 8080 already in use"
1. Edit `docker-compose.yml`
2. Change `8080:80` to `YOUR_PORT:80`
3. Run again

### "Cannot find docker-compose"
- Update Docker Desktop to the latest version
- Or use: `docker compose up -d` (without hyphen)

## Next Steps

1. Start with **Reconnaissance & Footprinting** (Beginner)
2. Or jump to **Prompt Injection Attacks** for AI security
3. Complete challenges to earn points and level up!
4. Track your progress on the dashboard

## Support

See full README.md for detailed documentation.

---

**Happy Hacking! 🛡️**