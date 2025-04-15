import os
import requests
from PIL import Image
from io import BytesIO

# Create courses directory if it doesn't exist
os.makedirs('assets/images/courses', exist_ok=True)

# Course images mapping
course_images = {
    # Technical Courses
    'web-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'python-development': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    'mobile-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'data-science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'cloud-computing': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
    'react-development': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    'node-development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    'ui-ux-design': 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'devops': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'blockchain': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    'game-development': 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8',
    'ios-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'android-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'fullstack-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'machine-learning': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'cloud-security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'data-engineering': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'microservices': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
    'iot': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'computer-vision': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'nlp': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'ar-vr': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'quantum-computing': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    'robotics': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'artificial-intelligence': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'ethical-hacking': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',

    # Business & Management
    'business-analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'project-management': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'financial-analysis': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    'entrepreneurship': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'supply-chain': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'hr': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'digital-marketing': 'https://images.unsplash.com/photo-1552664730-d307ca884978',

    # Creative & Design
    'content-writing': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'video-editing': 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'graphic-design': 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'photography': 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
    'music-production': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    '3d-modeling': 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'creative-writing': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',

    # Language & Personal Development
    'english-language': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'spanish-language': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'french-language': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'japanese-language': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'public-speaking': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'time-management': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'leadership': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'personal-finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    'health-wellness': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
}

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            img = img.resize((800, 600), Image.Resampling.LANCZOS)
            img.save(f'assets/images/courses/{filename}.jpg', 'JPEG', quality=85)
            print(f"Downloaded: {filename}")
        else:
            print(f"Failed to download: {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")

def main():
    for course, url in course_images.items():
        download_image(url, course)

if __name__ == "__main__":
    main() 