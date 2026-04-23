# Leaf Chlorosis Analysis System

A sophisticated web-based application for detecting and analyzing leaf chlorosis (yellowing) in plant leaves using advanced image processing techniques. The system evaluates plant health status, provides comprehensive visualizations, and generates downloadable analytical reports.

**Live Demo:** [https://leaf-chlorosis-analysis-1.onrender.com/](https://leaf-chlorosis-analysis-1.onrender.com/)

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Author](#author)

---

## Features

- **Image Analysis**
  - Automated detection of green and yellow regions in leaf images
  - Precise chlorosis index calculation
  - Advanced color-based segmentation

- **Health Classification**
  - Multi-level condition assessment: Healthy / Mild / Severe
  - Confidence scoring for accurate diagnosis
  - Real-time severity evaluation

- **Interactive Dashboard**
  - Animated visualizations of analysis results
  - Dynamic severity indicators
  - Ratio and confidence metric displays
  - Real-time data updates

- **Comprehensive Visualizations**
  - Segmented leaf imagery
  - Isolated yellow region highlighting
  - Multi-layer overlay analysis
  - Distribution histograms

- **Report Generation**
  - Professional PDF report export
  - Detailed analysis summary
  - Downloadable results for record-keeping

- **Performance**
  - Lightweight processing without machine learning dependencies
  - Fast analysis turnaround (no GPU required)
  - Scalable architecture

---

## Technology Stack

### Backend
- **Framework:** Flask (Python)
- **Image Processing:** OpenCV
- **Data Processing:** NumPy
- **Visualization:** Matplotlib
- **Report Generation:** ReportLab / PyPDF2

### Frontend
- **Markup:** HTML5
- **Styling:** CSS3
- **Interactivity:** JavaScript (Vanilla)

### Deployment
- **Hosting Platform:** Render
- **Server:** Gunicorn

---

## Project Structure

```
leaf-chlorosis-app/
├── backend/
│   ├── __pycache__/
│   ├── outputs/              # Generated analysis results
│   ├── uploads/              # User-uploaded images
│   ├── app.py                # Main Flask application
│   └── chlorosis.py          # Image processing logic
├── frontend/
│   ├── images/               # Asset images
│   ├── index.html            # Main HTML file
│   ├── script.js             # JavaScript functionality
│   └── style.css             # Styling
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Virtual environment (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shazzad08/leaf-chlorosis-analysis.git
   cd leaf-chlorosis-analysis
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python backend/app.py
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`

---

## How It Works

The Leaf Chlorosis Analysis System follows a streamlined four-step process:

### Step 1: Image Upload
User uploads a high-quality leaf image in standard formats (JPG, PNG)

### Step 2: Color Detection
The system analyzes the image to identify and separate green and yellow regions using advanced color space techniques

### Step 3: Analysis & Classification
- Calculates the chlorosis index based on the ratio of yellow to total leaf area
- Determines severity level: Healthy (< 10%), Mild (10-30%), Severe (> 30%)
- Generates confidence metrics for the assessment

### Step 4: Results & Report
- Displays comprehensive analytical dashboard with visualizations
- Generates and offers downloadable PDF report with findings

---

## API Documentation

### Upload Endpoint

**Endpoint:** `POST /api/analyze`

**Request:**
```
Content-Type: multipart/form-data
- file: image file (required)
```

**Response:**
```json
{
  "success": true,
  "chlorosis_index": 18.5,
  "severity": "Mild",
  "confidence": 0.95,
  "green_area": 81.5,
  "yellow_area": 18.5,
  "visualizations": {
    "segmented": "base64_image",
    "yellow_regions": "base64_image",
    "overlay": "base64_image",
    "histogram": "base64_image"
  }
}
```

---

## Usage Example

```python
# Example using the system
from backend.chlorosis import analyze_leaf_image

# Load and analyze an image
results = analyze_leaf_image('path/to/leaf/image.jpg')

# Access results
print(f"Chlorosis Index: {results['chlorosis_index']}%")
print(f"Severity: {results['severity']}")
print(f"Confidence: {results['confidence']:.2%}")
```

---

## Contributing

We welcome contributions to enhance the Leaf Chlorosis Analysis System. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Author

**Shazzad**

- GitHub: [@shazzad08](https://github.com/shazzad08)
- Project Repository: [leaf-chlorosis-analysis](https://github.com/shazzad08/leaf-chlorosis-analysis)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/shazzad08/leaf-chlorosis-analysis/issues).

---

**Last Updated:** April 2026
