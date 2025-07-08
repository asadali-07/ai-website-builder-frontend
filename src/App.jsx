import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Code,
  Eye,
  X,
  Maximize2,
  Minimize2,
  Upload,
  ExternalLink,
  Copy,
  Menu,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        '👋 Hello! I\'m your AI Website Builder assistant. I can help you create beautiful, responsive websites with HTML, CSS, and JavaScript.\n\n🚀 **What I can build for you:**\n• Landing pages\n• Portfolio websites\n• E-commerce showcases\n• Dashboard interfaces\n• Interactive web apps\n\n💡 **Just tell me what you want to create!**\n\nExample: "Create a modern landing page for a tech startup" or "Build a portfolio website with dark theme"',
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codePreview, setCodePreview] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced Prism.js initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.Prism) {
        window.Prism.highlightAll();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [codePreview, activeTab, messages]);

  // Enhanced code extraction with multiple patterns
  const extractCode = (content) => {
    const codeBlocks = {
      html: "",
      css: "",
      js: "",
    };

    // Enhanced regex patterns for better matching
    const htmlPatterns = [
      /```html\n([\s\S]*?)```/i,
      /```HTML\n([\s\S]*?)```/i,
      /```markup\n([\s\S]*?)```/i,
      /```\n(<!DOCTYPE html[\s\S]*?)```/i,
    ];

    const cssPatterns = [
      /```css\n([\s\S]*?)```/i,
      /```CSS\n([\s\S]*?)```/i,
      /```\n(:root[\s\S]*?)```/i,
      /```\n(\*[\s\S]*?)```/i,
    ];

    const jsPatterns = [
      /```javascript\n([\s\S]*?)```/i,
      /```js\n([\s\S]*?)```/i,
      /```JavaScript\n([\s\S]*?)```/i,
      /```\n(document\.[\s\S]*?)```/i,
      /```\n(window\.[\s\S]*?)```/i,
    ];

    // Try HTML patterns
    for (const pattern of htmlPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        codeBlocks.html = match[1].trim();
        break;
      }
    }

    // Try CSS patterns
    for (const pattern of cssPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        codeBlocks.css = match[1].trim();
        break;
      }
    }

    // Try JavaScript patterns
    for (const pattern of jsPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        codeBlocks.js = match[1].trim();
        break;
      }
    }

    return codeBlocks;
  };

  const generatePreview = (html, css, js) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('Script error:', error);
            }
          </script>
        </body>
      </html>
    `;
  };

  const publishWebsite = async () => {
    if (!codePreview) {
      alert("No code to publish! Generate some code first.");
      return;
    }

    setIsPublishing(true);
    setPublishedUrl(null);

    try {
      const response = await fetch("https://ai-website-builder-backend-jcc3.onrender.com/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: codePreview.html,
          css: codePreview.css,
          js: codePreview.js,
        }),
      });

      if (!response.ok) {
        throw new Error("Publishing failed");
      }

      const data = await response.json();
      setPublishedUrl(data.url);

      const successMessage = {
        id: Date.now(),
        type: "assistant",
        content: `🎉 **Website Published Successfully!**\n\nYour website is now live and accessible at:\n🔗 ${data.url}\n\n✅ **What's deployed:**\n• Fully responsive design\n• Optimized for performance\n• Cross-browser compatible\n\n📱 You can now share this link with anyone!`,
      };
      setMessages((prev) => [...prev, successMessage]);
    } catch (error) {
      console.error("Publishing error:", error);
      const errorMessage = {
        id: Date.now(),
        type: "assistant",
        content:
          "❌ Error in publishing your website. Please try again later or check the server status.\n\n🔄 **Possible solutions:**\n1. Ensure the server is running\n2. Check your internet connection\n3. Try refreshing the page and publishing again",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsPublishing(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://ai-website-builder-backend-jcc3.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: data.response || "No response received",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const codeBlocks = extractCode(data.response || "");
      if (codeBlocks.html || codeBlocks.css || codeBlocks.js) {
        const preview = generatePreview(
          codeBlocks.html,
          codeBlocks.css,
          codeBlocks.js
        );
        setCodePreview({
          html: codeBlocks.html,
          css: codeBlocks.css,
          js: codeBlocks.js,
          preview: preview,
        });
        setIsPreviewOpen(true);
        setActiveTab("code");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "🚨 **Connection Error**\n\nI'm having trouble connecting to the server. Please:\n\n🔄 **Try again in a moment**\n🔧 **Check if the server is running**\n🌐 **Verify your internet connection**\n\nIf the problem persists, please refresh the page.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Code formatting helper
  const formatCode = (code, language) => {
    if (!code) return "";

    if (language === "markup" || language === "html") {
      // Basic HTML formatting
      return code
        .replace(/></g, ">\n<")
        .replace(/(\s{2,})/g, " ")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line, index, array) => {
          // Simple indentation logic
          const openTags = (line.match(/</g) || []).length;
          const closeTags = (line.match(/>/g) || []).length;
          const selfClosing = line.includes("/>");

          if (line.startsWith("<!")) return line;
          if (line.startsWith("</")) return line;

          const indent = Math.max(0, (openTags - closeTags) * 2);
          return " ".repeat(indent) + line;
        })
        .join("\n");
    }

    if (language === "css") {
      // Basic CSS formatting
      return code
        .replace(/;/g, ";\n")
        .replace(/{/g, " {\n")
        .replace(/}/g, "\n}\n")
        .split("\n")
        .map((line, index, array) => {
          const trimmed = line.trim();
          if (trimmed === "") return "";
          if (trimmed.endsWith("{")) return trimmed;
          if (trimmed === "}") return trimmed;
          if (
            trimmed.startsWith("/*") ||
            trimmed.startsWith("*") ||
            trimmed.endsWith("*/")
          )
            return trimmed;
          return "  " + trimmed;
        })
        .filter((line) => line !== "")
        .join("\n");
    }

    return code;
  };

  // Enhanced CodeBlock for chat messages
  const CodeBlock = ({ language, code }) => {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (codeRef.current && window.Prism) {
        const formattedCode = formatCode(code, language);
        codeRef.current.textContent = formattedCode;
        window.Prism.highlightElement(codeRef.current);
      }
    }, [code, language]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="bg-gray-800 rounded-lg my-2 lg:my-3 border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
          <div className="text-yellow-400 text-xs mb-0 font-semibold uppercase tracking-wide flex items-center">
            <Code size={12} className="mr-1" />
            {language === "markup" ? "HTML" : language.toUpperCase()}
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-600 transition-colors flex items-center"
          >
            <Copy size={10} className="mr-1" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="p-3 lg:p-4 overflow-x-auto">
          <pre className="text-xs sm:text-sm leading-relaxed">
            <code
              ref={codeRef}
              className={`language-${
                language === "markup" ? "html" : language
              }`}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    );
  };

  // Enhanced PrismCodeBlock for preview panel
  const PrismCodeBlock = ({ language, code, title }) => {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (codeRef.current && window.Prism) {
        const formattedCode = formatCode(code, language);
        codeRef.current.textContent = formattedCode;
        window.Prism.highlightElement(codeRef.current);
      }
    }, [code, language]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800 px-3 sm:px-4 py-2 rounded-t-lg">
          <span className="text-yellow-400 text-xs sm:text-sm font-semibold flex items-center mb-2 sm:mb-0">
            <Code size={12} className="mr-1 sm:mr-2" />
            {title}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors flex items-center self-end sm:self-auto"
          >
            <Copy size={10} className="mr-1" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="bg-gray-900 rounded-b-lg overflow-hidden">
          <div className="p-2 sm:p-3 lg:p-4 overflow-x-auto">
            <pre className="text-xs sm:text-sm leading-relaxed">
              <code
                ref={codeRef}
                className={`language-${
                  language === "markup" ? "html" : language
                }`}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced message formatting
  const formatMessageContent = (content) => {
    const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockPattern.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push({ type: "text", content: textBefore });
        }
      }

      // Add code block
      parts.push({
        type: "code",
        language: match[1] || "text",
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remaining = content.substring(lastIndex);
      if (remaining.trim()) {
        parts.push({ type: "text", content: remaining });
      }
    }

    // If no code blocks found, treat as text
    if (parts.length === 0) {
      parts.push({ type: "text", content });
    }

    return parts.map((part, index) => {
      if (part.type === "code") {
        return (
          <CodeBlock key={index} language={part.language} code={part.content} />
        );
      } else {
        // Process text content for formatting
        const textParts = part.content.split(
          /(\*\*[^*]+\*\*|\*[^*]+\*|🎉|🚀|💡|✅|❌|🔧|🔗|📱|🌐|🔄|🚨|https?:\/\/[^\s]+)/
        );

        return textParts.map((textPart, textIndex) => {
          // Bold text
          if (textPart.startsWith("**") && textPart.endsWith("**")) {
            return (
              <strong
                key={`${index}-${textIndex}`}
                className="font-bold text-gray-900"
              >
                {textPart.slice(2, -2)}
              </strong>
            );
          }

          // Italic text
          if (
            textPart.startsWith("*") &&
            textPart.endsWith("*") &&
            !textPart.includes("**")
          ) {
            return (
              <em
                key={`${index}-${textIndex}`}
                className="italic text-gray-700"
              >
                {textPart.slice(1, -1)}
              </em>
            );
          }

          // Emojis
          if (/^[🎉🚀💡✅❌🔧🔗📱🌐🔄🚨]$/.test(textPart)) {
            return (
              <span
                key={`${index}-${textIndex}`}
                className="text-base lg:text-lg mr-1"
              >
                {textPart}
              </span>
            );
          }

          // URLs
          if (textPart.includes("http")) {
            return (
              <a
                key={`${index}-${textIndex}`}
                href={textPart}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base"
              >
                {textPart}
              </a>
            );
          }

          // Regular text
          return textPart ? (
            <span
              key={`${index}-${textIndex}`}
              className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base"
            >
              {textPart}
            </span>
          ) : null;
        });
      }
    });
  };

  const renderMessage = (message) => {
    if (!message || !message.content) {
      return null;
    }

    if (message.type === "user") {
      return (
        <div key={message.id} className="flex justify-end mb-4 lg:mb-6">
          <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg shadow-md">
            <p className="text-xs sm:text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div key={message.id} className="flex justify-start mb-4 lg:mb-6">
          <div className="bg-white text-gray-800 px-3 sm:px-4 py-3 sm:py-4 rounded-lg max-w-[85%] sm:max-w-xs lg:max-w-2xl xl:max-w-4xl shadow-md border border-gray-200">
            <div className="prose prose-sm max-w-none">
              {formatMessageContent(message.content)}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col order-2 lg:order-1">
        {/* Header */}
        <div className="bg-white shadow-sm p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                <Code size={16} className="text-white sm:w-5 sm:h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                  Aximo
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Chat with Aximo to create websites
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              {codePreview && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Menu size={20} />
                </button>
              )}
            </div>

            {/* Desktop Publish Button */}
            <div className="hidden lg:flex">
              {codePreview && (
                <div className="flex items-center space-x-2">
                  {publishedUrl && (
                    <a
                      href={publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-2 lg:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs lg:text-sm hover:bg-green-200 transition-colors"
                    >
                      <ExternalLink size={12} className="mr-1" />
                      <span className="hidden sm:inline">View Live Site</span>
                    </a>
                  )}
                  <button
                    onClick={publishWebsite}
                    disabled={isPublishing}
                    className="flex items-center px-3 lg:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                  >
                    {isPublishing ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 lg:h-4 lg:w-4 border-b-2 border-white mr-2"></div>
                        <span className="text-xs lg:text-sm">
                          Publishing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload size={14} className="mr-1 lg:mr-2" />
                        <span className="text-xs lg:text-sm">Publish</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && codePreview && (
            <div className="lg:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {publishedUrl && (
                  <a
                    href={publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Live Site
                  </a>
                )}
                <button
                  onClick={publishWebsite}
                  disabled={isPublishing}
                  className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                  {isPublishing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      Publish Website
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Code size={16} className="mr-2" />
                  View Code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
          {messages.map(renderMessage).filter(Boolean)}
          {isLoading && (
            <div className="flex justify-start mb-4 lg:mb-6">
              <div className="bg-white text-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
                  <span className="text-xs sm:text-sm">AI is thinking wait a minute...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to build a website... (e.g., 'Create a modern portfolio website')"
              className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              rows="2"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center sm:justify-start"
            >
              <Send size={16} className="sm:w-4 sm:h-4" />
              <span className="ml-2 sm:hidden">Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Preview Panel */}
      {isPreviewOpen && codePreview && (
        <div
          className={`${
            isPreviewMaximized
              ? "fixed inset-0 z-50 bg-white"
              : "fixed inset-0 lg:relative lg:inset-auto lg:w-1/2 xl:w-2/5 order-1 lg:order-2"
          } border-l border-gray-300 bg-white flex flex-col shadow-lg`}
        >
          {/* Preview Header */}
          <div className="bg-gray-50 p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-4 mb-3 sm:mb-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                <Code size={16} className="mr-1 sm:mr-2" />
                Code Preview
              </h2>

              {/* Close button for mobile */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-gray-200 rounded transition-colors lg:hidden"
                title="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Buttons */}
            <div className="flex justify-between sm:justify-start items-center">
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "code"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Code size={14} className="mr-1" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "preview"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Eye size={14} className="mr-1" />
                  Preview
                </button>
              </div>

              {/* Desktop Controls */}
              <div className="hidden lg:flex space-x-2 ml-4">
                <button
                  onClick={() => setIsPreviewMaximized(!isPreviewMaximized)}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title={isPreviewMaximized ? "Minimize" : "Maximize"}
                >
                  {isPreviewMaximized ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={18} />
                  )}
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Code Display with Prism.js */}
            {activeTab === "code" && (
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-900">
                {codePreview.html && (
                  <PrismCodeBlock
                    language="markup"
                    code={codePreview.html}
                    title="HTML"
                  />
                )}
                {codePreview.css && (
                  <PrismCodeBlock
                    language="css"
                    code={codePreview.css}
                    title="CSS"
                  />
                )}
                {codePreview.js && (
                  <PrismCodeBlock
                    language="javascript"
                    code={codePreview.js}
                    title="JavaScript"
                  />
                )}
                {!codePreview.html && !codePreview.css && !codePreview.js && (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Code
                        size={36}
                        className="mx-auto mb-4 opacity-50 sm:w-12 sm:h-12"
                      />
                      <p className="text-sm sm:text-base">No code to display</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Live Preview */}
            {activeTab === "preview" && (
              <div className="flex-1 flex flex-col bg-white">
                <div className="bg-gray-50 p-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600 flex items-center">
                    <Eye size={14} className="mr-1" />
                    Live Preview
                  </span>
                </div>
                <iframe
                  srcDoc={codePreview.preview}
                  title="preview"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// "Create a modern digital marketing agency website with multiple pages"

// "Build a complete portfolio website for a freelance photographer"

// "Design a SaaS product landing page with pricing and features"

// "Create a restaurant website with menu, about, and reservation system"

// "Build a consulting firm website with services and case studies"