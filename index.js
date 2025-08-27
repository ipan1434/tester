<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SpeedCloud - Website Hosting</title>
    <link rel="stylesheet" href="src/css/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-pattern"></div>
    
    <div class="container">
        <header class="header">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-cloud"></i>
                </div>
                <div class="logo-text">
                    <h1>SpeedCloud</h1>
                    <span class="tagline">Lightning-fast website deployment</span>
                </div>
            </div>
            
            <div class="creator-badge">
                <span class="created-by">Created by <strong>Xvoid</strong></span>
                <a href="https://t.me/Xvoid10" target="_blank" class="telegram-link">
                    <i class="fab fa-telegram"></i>
                    <span>@Xvoid10</span>
                </a>
            </div>
        </header>

        <main class="main-content">
            <!-- Deploy Form -->
            <div class="deploy-section" id="deployForm">
                <div class="section-header">
                    <h2>Deploy Your Website</h2>
                    <p>Upload your files and get your website live in seconds</p>
                </div>

                <div class="deploy-card">
                    <div class="form-group">
                        <label for="subdomain" class="form-label">
                            <i class="fas fa-globe"></i>
                            <span>Choose Your Domain</span>
                        </label>
                        <div class="subdomain-input">
                            <input 
                                type="text" 
                                id="subdomain" 
                                placeholder="my-awesome-site"
                                maxlength="64"
                                pattern="[a-z0-9-]{3,64}"
                            >
                            <span class="domain-suffix">vipmart.site</span>
                        </div>
                        <div class="input-hint">
                            <i class="fas fa-info-circle"></i>
                            <span>3-64 characters, lowercase letters, numbers, and dashes only</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Upload Your Files</span>
                        </label>
                        
                        <input type="file" id="fileInput" accept=".html,.zip" hidden>
                        
                        <div class="file-upload-area" id="fileDropZone">
                            <div class="upload-icon">
                                <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <div class="upload-text">
                                <h3>Drag & drop your files here</h3>
                                <p>or click to browse</p>
                            </div>
                            <button type="button" class="browse-button" onclick="document.getElementById('fileInput').click()">
                                <i class="fas fa-folder-open"></i>
                                <span>Browse Files</span>
                            </button>
                            <div class="file-types">
                                <span class="file-type">HTML</span>
                                <span class="file-type">ZIP</span>
                                <span class="size-limit">Max 10MB</span>
                            </div>
                        </div>

                        <div class="file-preview" id="fileInfo" style="display: none;">
                            <div class="file-icon">
                                <i class="fas fa-file-code"></i>
                            </div>
                            <div class="file-details">
                                <div class="file-name" id="fileName"></div>
                                <div class="file-size" id="fileSize"></div>
                            </div>
                            <button type="button" class="remove-file-btn" onclick="removeFile()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="deploy-button" id="deployBtn" disabled>
                        <div class="button-content">
                            <i class="fas fa-rocket"></i>
                            <span>Deploy Website</span>
                        </div>
                        <div class="button-shine"></div>
                    </button>
                </div>
            </div>

            <!-- Loading Screen -->
            <div class="loading-section" id="loadingScreen" style="display: none;">
                <div class="loading-card">
                    <div class="loading-animation">
                        <div class="loading-spinner"></div>
                        <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                    <div class="loading-content">
                        <h3 id="loadingTitle">Preparing deployment...</h3>
                        <p id="loadingMessage">Please wait while we process your request</p>
                        
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" id="progressFill"></div>
                            </div>
                            <div class="progress-text">
                                <span id="progressPercent">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Result Screen -->
            <div class="result-section" id="resultScreen" style="display: none;">
                <div class="result-card">
                    <div class="result-icon">
                        <div class="success-icon" id="successIcon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="error-icon" id="errorIcon" style="display: none;">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                    </div>
                    
                    <div class="result-content">
                        <h3 id="resultTitle">Deployment Successful!</h3>
                        <p id="resultMessage">Your website is now live and accessible worldwide</p>
                    </div>
                    
                    <div class="website-details" id="websiteInfo">
                        <div class="url-section">
                            <label class="detail-label">Your Website URL</label>
                            <div class="url-container">
                                <input type="text" id="websiteUrl" readonly>
                                <div class="url-actions">
                                    <button onclick="copyUrl()" class="action-btn copy-btn" title="Copy URL">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                    <a id="visitLink" href="#" target="_blank" class="action-btn visit-btn" title="Visit Website">
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="qr-section" id="qrContainer">
                            <label class="detail-label">QR Code</label>
                            <div class="qr-code-container">
                                <div class="qr-code" id="qrCode"></div>
                                <p class="qr-description">Scan to visit your website</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="result-actions">
                        <button onclick="resetForm()" class="secondary-btn">
                            <i class="fas fa-plus"></i>
                            <span>Deploy Another</span>
                        </button>
                        <button onclick="shareWebsite()" class="primary-btn">
                            <i class="fas fa-share-alt"></i>
                            <span>Share Website</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2025 SpeedCloud. Love you.</p>
                <div class="footer-links">
                    <a href="#" class="footer-link">Privacy</a>
                    <a href="#" class="footer-link">Terms</a>
                    <a href="https://t.me/Xvoid10" class="footer-link">Support</a>
                </div>
            </div>
        </footer>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js"></script>
    <script src="src/js/script.js"></script>
</body>
</html>
