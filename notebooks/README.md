# HackLearn Pro - Interactive Notebooks

This directory contains hands-on Jupyter notebooks for learning ethical hacking and cybersecurity concepts interactively through Google Colab.

## Available Notebooks

### 1. Prompt Injection (01-prompt-injection.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/hacklearn/blob/main/notebooks/01-prompt-injection.ipynb)

**Topics Covered:**
- Understanding prompt injection attacks
- Direct vs. indirect injection
- Attack vectors and techniques
- Defense mechanisms
- Building secure AI systems

**What You'll Learn:**
- Create vulnerable AI assistants
- Exploit prompt injection vulnerabilities
- Implement detection systems
- Build secure prompt handlers

**Prerequisites:**
- Basic Python knowledge
- Understanding of LLMs

---

### 2. Adversarial Machine Learning (02-adversarial-ml.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/hacklearn/blob/main/notebooks/02-adversarial-ml.ipynb)

**Topics Covered:**
- Adversarial examples and attacks
- FGSM (Fast Gradient Sign Method)
- PGD (Projected Gradient Descent)
- Model poisoning attacks
- Backdoor attacks
- Defense strategies

**What You'll Learn:**
- Generate adversarial examples
- Attack ML classifiers
- Implement adversarial training
- Build robust models
- Detect adversarial inputs

**Prerequisites:**
- Python and NumPy
- Basic machine learning concepts
- Understanding of neural networks

---

### 3. SQL Injection (12-sql-injection.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/hacklearn/blob/main/notebooks/12-sql-injection.ipynb)

**Topics Covered:**
- SQL injection fundamentals
- Authentication bypass
- UNION-based injection
- Blind SQL injection
- Time-based attacks
- Secure coding practices

**What You'll Learn:**
- Identify SQL injection vulnerabilities
- Exploit database systems
- Extract sensitive data
- Write secure queries
- Implement input validation

**Prerequisites:**
- Basic Python
- SQL query knowledge
- Database concepts

---

### 4. Cross-Site Scripting (13-xss.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/hacklearn/blob/main/notebooks/13-xss.ipynb)

**Topics Covered:**
- Reflected XSS attacks
- Stored XSS attacks
- DOM-based XSS
- Cookie stealing
- Keylogger injection
- XSS worms
- Defense mechanisms

**What You'll Learn:**
- Identify XSS vulnerabilities
- Craft XSS payloads
- Exploit web applications
- Implement sanitization
- Use Content Security Policy

**Prerequisites:**
- Python and HTML basics
- Understanding of web apps
- JavaScript (helpful)

---

### 5. Penetration Testing (20-penetration-testing.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YOUR_USERNAME/hacklearn/blob/main/notebooks/20-penetration-testing.ipynb)

**Topics Covered:**
- Penetration testing methodology
- Reconnaissance techniques
- Port scanning and enumeration
- Vulnerability assessment
- Exploitation techniques
- Post-exploitation
- Professional reporting

**What You'll Learn:**
- Conduct security assessments
- Use penetration testing tools
- Identify vulnerabilities
- Document findings
- Write professional reports

**Prerequisites:**
- Basic networking
- Linux/Windows knowledge
- Command-line experience
- Python basics

---

## How to Use These Notebooks

### Option 1: Google Colab (Recommended)

1. Click the "Open in Colab" badge for any notebook
2. The notebook will open in Google Colab
3. Click "Runtime" > "Run all" to execute all cells
4. Follow along with the interactive examples

**Advantages:**
- No installation required
- Free GPU access
- Saved to your Google Drive
- Easy sharing

### Option 2: Local Jupyter

1. Install Jupyter:
   ```bash
   pip install jupyter
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hacklearn.git
   cd hacklearn/notebooks
   ```

3. Start Jupyter:
   ```bash
   jupyter notebook
   ```

4. Open any `.ipynb` file

### Option 3: VS Code

1. Install VS Code and Python extension
2. Install Jupyter extension
3. Open notebook file
4. Click "Run All" or run cells individually

---

## Notebook Structure

Each notebook follows this structure:

1. **Introduction** - Overview and learning objectives
2. **Setup** - Install dependencies and import libraries
3. **Theory** - Conceptual explanations
4. **Demonstrations** - Hands-on examples
5. **Exercises** - Practice challenges
6. **Summary** - Key takeaways and resources

---

## Requirements

### Python Packages

Most notebooks use standard Python libraries:
- `numpy` - Numerical computing
- `matplotlib` - Visualization
- `requests` - HTTP requests
- `sqlite3` - Database operations (built-in)

Some notebooks require additional packages:
```bash
pip install scikit-learn pillow python-nmap scapy
```

All dependencies are installed automatically in Colab via pip install commands in the notebooks.

### Browser Requirements

For the best experience:
- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Stable internet connection

---

## Educational Use Only

**IMPORTANT NOTICE:**

These notebooks are for **EDUCATIONAL PURPOSES ONLY**:

- Only test systems you own or have explicit permission to test
- Unauthorized access to computer systems is illegal
- Follow responsible disclosure practices
- Respect privacy and data protection laws
- Use these skills ethically

**Legal Disclaimer:**
The authors and HackLearn Pro are not responsible for any misuse of the information provided. By using these notebooks, you agree to use them only for legal and ethical purposes.

---

## Contributing

Want to improve these notebooks or add new ones?

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

**Guidelines:**
- Follow the existing notebook structure
- Include clear explanations
- Add practical examples
- Provide challenge exercises
- Test all code cells

---

## Troubleshooting

### Common Issues

**Problem:** Notebook won't open in Colab
- **Solution:** Ensure the repository is public or you're logged into GitHub

**Problem:** Cells fail to execute
- **Solution:** Run cells in order from top to bottom

**Problem:** Package installation fails
- **Solution:** Restart runtime and try again

**Problem:** Code runs slowly
- **Solution:** Use Colab's GPU runtime (Runtime > Change runtime type > GPU)

---

## Learning Path

### Recommended Order for Beginners

1. **SQL Injection** (12) - Foundation in web security
2. **XSS** (13) - Continue with web vulnerabilities
3. **Prompt Injection** (01) - AI-specific attacks
4. **Adversarial ML** (02) - ML security concepts
5. **Penetration Testing** (20) - Complete methodology

### Advanced Path

If you already have security experience:
1. **Penetration Testing** (20) - Overall methodology
2. **Prompt Injection** (01) - Cutting-edge AI security
3. **Adversarial ML** (02) - Advanced ML attacks
4. **SQL Injection** (12) - Classic but critical
5. **XSS** (13) - Still highly relevant

---

## Additional Resources

### Books
- "The Web Application Hacker's Handbook" by Dafydd Stuttard
- "Hacking: The Art of Exploitation" by Jon Erickson
- "AI Safety" by Stuart Russell

### Online Courses
- OWASP WebGoat
- HackTheBox
- TryHackMe

### Tools
- Burp Suite
- OWASP ZAP
- Metasploit
- Nmap

### Communities
- OWASP Foundation
- DEF CON
- Black Hat
- r/netsec

---

## Updates

These notebooks are regularly updated with:
- New attack techniques
- Updated defense mechanisms
- Bug fixes
- Additional exercises
- Community contributions

Check back regularly for updates!

---

## Support

Need help?

1. **Check the notebook** - Most questions are answered inline
2. **Review the code** - All code is commented
3. **Read the guide** - See `COLAB_INTEGRATION_GUIDE.md`
4. **Ask the community** - Open an issue on GitHub

---

## License

These notebooks are part of HackLearn Pro and are licensed for educational use.

---

## Acknowledgments

Special thanks to:
- The cybersecurity community
- OWASP Foundation
- Google Colab team
- All contributors

---

**HackLearn Pro - Learn by doing, secure by design.**

*Last updated: October 2025*
