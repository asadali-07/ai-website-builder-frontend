# 🚀 AI Website Builder

**Transform your ideas into beautiful websites with the power of AI!**

An intelligent website builder that uses Google's Gemini AI to generate complete, responsive websites with HTML, CSS, and JavaScript. Create professional websites in seconds and deploy them instantly to Netlify.

![AI Website Builder](https://img.shields.io/badge/AI-Powered-brightgreen?style=for-the-badge&logo=openai)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge&logo=vite)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify)

## ✨ Features

### 🤖 **AI-Powered Generation**
- **Natural Language Input**: Describe your website in plain English
- **Multi-Page Websites**: Generate complete websites with multiple sections
- **Professional Templates**: Landing pages, portfolios, SaaS sites, and more
- **Industry-Specific**: Customized content for different business types

### 💻 **Advanced Code Generation**
- **Clean HTML5**: Semantic, accessible markup
- **Modern CSS**: Responsive design with CSS Grid and Flexbox
- **Interactive JavaScript**: Dynamic functionality and animations
- **Optimized Performance**: Fast-loading, production-ready code

### 🎨 **Beautiful Design System**
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional aesthetics
- **Color Psychology**: Industry-appropriate color schemes
- **Typography**: Beautiful font combinations

### 🛠️ **Developer Experience**
- **Live Preview**: See your website as you build it
- **Syntax Highlighting**: Powered by Prism.js
- **Code Formatting**: Auto-formatted, readable code
- **Copy & Export**: Easy code sharing and export

### 🚀 **One-Click Deployment**
- **Instant Publishing**: Deploy to Netlify in seconds
- **Live URLs**: Share your websites immediately
- **Automatic Updates**: Redeploy with ease
- **Professional Hosting**: Fast, reliable hosting

## 🏗️ Architecture

```
ai-website-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Netlify CLI
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-website-builder.git
cd ai-website-builder
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Set up environment variables**
```bash
# In server directory, create .env file
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

4. **Set up Netlify**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site (run in project root)
netlify init
```

5. **Start the development servers**
```bash
# Start backend server (in server directory)
npm start

# Start frontend (in client directory)
npm run dev
```

6. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 🎯 Usage

### Creating Your First Website

1. **Start a conversation** with the AI:
   ```
   "Create a modern landing page for a tech startup"
   ```

2. **Watch the magic happen**:
   - AI generates HTML, CSS, and JavaScript
   - Live preview appears instantly
   - Code is automatically formatted and highlighted

3. **Customize and refine**:
   ```
   "Make the hero section darker and add more call-to-action buttons"
   ```

4. **Deploy with one click**:
   - Click the "Publish" button
   - Get your live URL instantly
   - Share with the world!

### Example Prompts

```javascript
// Landing Pages
"Create a SaaS product landing page with pricing tables"
"Build a modern agency website with portfolio showcase"

// E-commerce
"Design an online store homepage with product grid"
"Create a fashion brand landing page with lookbook"

// Portfolio
"Build a photographer portfolio with image galleries"
"Create a developer portfolio with project showcases"

// Business
"Design a restaurant website with menu and reservations"
"Create a consulting firm website with services"
```

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Prism.js**: Syntax highlighting
- **Lucide React**: Beautiful icons

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Google Gemini AI**: Advanced language model
- **Netlify CLI**: Deployment integration
- **CORS**: Cross-origin resource sharing

### Deployment
- **Netlify**: Frontend and website hosting
- **Vercel/Heroku**: Backend hosting options

## 🎨 Customization

### Modifying AI Prompts
The AI system prompt is located in `server/index.js`. You can customize it to:
- Generate different types of websites
- Use specific design patterns
- Include particular frameworks or libraries
- Target specific industries

### Adding New Features
- **Custom Components**: Add reusable UI components
- **Templates**: Create predefined website templates
- **Integrations**: Connect with other APIs and services
- **Themes**: Add different design themes

## 🔧 Configuration

### Environment Variables
```bash
# Server (.env)
GEMINI_API_KEY=your_api_key
PORT=5000
NODE_ENV=development

# Client (optional)
VITE_API_URL=http://localhost:5000
```

### Netlify Setup
```bash
# netlify.toml (in project root)
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📱 Mobile Responsive

The AI Website Builder is fully responsive and works perfectly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📈 Roadmap

- [ ] **Template Library**: Pre-built website templates
- [ ] **User Authentication**: Save and manage projects
- [ ] **Advanced Customization**: Theme editor and style controls
- [ ] **SEO Optimization**: Built-in SEO best practices
- [ ] **Analytics Integration**: Google Analytics setup
- [ ] **Multi-language Support**: International websites
- [ ] **Database Integration**: Dynamic content management
- [ ] **E-commerce Features**: Shopping cart and payments

## 🐛 Troubleshooting

### Common Issues

**Server won't start**
```bash
# Check if port 5000 is available
lsof -i :5000
# Kill any process using the port
kill -9 <PID>
```

**Netlify deployment fails**
```bash
# Re-authenticate with Netlify
netlify logout
netlify login
```

**Code highlighting not working**
```bash
# Clear browser cache
# Hard refresh (Ctrl+F5)
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language generation
- **Netlify** for seamless deployment
- **Prism.js** for beautiful syntax highlighting
- **Tailwind CSS** for rapid UI development
- **React & Vite** for excellent developer experience

## 📞 Support

Need help? We're here for you!

- 📧 **Email**: support@aiwebsitebuilder.com
- 💬 **Discord**: [Join our community](https://discord.gg/aiwebsitebuilder)
- 📖 **Documentation**: [Full docs](https://docs.aiwebsitebuilder.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-website-builder/issues)

---

**Built with ❤️ by Asad Ali**

*Transform your ideas into beautiful websites with the power of AI!*

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/asadali-07/ai-website-builder)