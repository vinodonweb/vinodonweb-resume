import { useState, useEffect } from 'react'
import './App.css'
import { Code, Smartphone, Server, Briefcase, Mail, Github, Linkedin, ExternalLink, Award, Check, ArrowRight } from 'lucide-react'
import RoleSwitcher from './components/RoleSwitcher'
import ScrollObserver from './components/ScrollObserver'
import AnimatedSection, { AnimatedItem } from './components/AnimatedSection'
import { AnimatedTitle, AnimatedHeading, AnimatedParagraph } from './components/AnimatedText'
import AnimatedIcon, { FloatingIcon, PulsingIcon } from './components/AnimatedIcon'
import AnimatedCard, { AnimatedProject } from './components/AnimatedCard'
import { motion } from 'framer-motion'
import RainbowButton from './components/RainbowButton'
import ImageCarousel from './components/ImageCarousel'
// Import real images for Android apps
import { cta1, cta2, cta3 } from './assets/images/cta/index'
import { followMe1, followMe2, followMe3 } from './assets/images/follow me/index'
import { news1, news2, news3, news4 } from './assets/images/news/index'
import { sound1, sound2, sound3, sound4 } from './assets/images/soundSaga/index'
import { weather1, weather2, weather3, weather4 } from './assets/images/wheather/index'
import { algo1, doodle1, doodle2, doodle3, doodle4, doodle5, doodle6 } from './assets/images/ios/index'
import irlLogo from './assets/images/IRL.png';
import { IRlTodo1, IRlTodo2, IRlTodo3, IRlTodo4, IRlTodo5, IRlTodo6 } from './assets/images/IRLTodo/Index'
import {break1, break2, break3, break4} from './assets/images/Break_reminder/index';


function App() {
  const [selectedRole, setSelectedRole] = useState('Full-Stack Developer');

  // Handle URL query parameter for role selection
 useEffect(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const roleParam = queryParams.get('type');

  if (roleParam) {
    // Map URL parameters to exact role names
    const roleMapping = {
      'ios-developer': 'iOS Developer',
      'full-stack-developer': 'Full-Stack Developer',
      'android-developer': 'Android Developer'
    };
    
    const matchedRole = roleMapping[roleParam.toLowerCase()];
    
    if (matchedRole) {
      setSelectedRole(matchedRole);
    }
  }
}, []);

  // Update URL when role changes
  const handleRoleChange = (role) => {
    const formattedParam = role.toLowerCase().replace(/ /g, '-');
    const url = new URL(window.location);
    url.searchParams.set('type', formattedParam);
    window.history.pushState({}, '', url);
    setSelectedRole(role);
  };

  const roleContent = {
    'Full-Stack Developer': {
      title: 'Full-Stack Developer',
      subtitle: 'Specializing in React, Node.js, and MongoDB',
      description: 'I build exceptional full-stack applications with modern technologies for scalable web experiences.',
      experiences: [
        {
          title: 'Graduate Assistant',
          company: 'Depaul University.',
          period: 'Dec 2024 - Present | On-Campus',
          description: [
            `Developed a centralized resource management platform serving 200+ university employees using Spring Boot
 (backend) and React (frontend), reducing project access time by 40%.`,
            `Architected and deployed a microservices ecosystem with Node.js and Spring Boot, achieving 99.9% system
 uptime and boosting query performance by 60% through integration of MongoDB and PostgreSQL.`,
            `Built React.js interfaces for real-time data visualization and analysis.`
          ],
          skills: ['React js', 'Node.js', 'MongoDB', 'Express', 'Express js', 'Digital Ocean', 'Load Balancing', 'CI/CD', 'Docker'],
          icon: 'code'
        },
        {
          title: ' Software Engineer',
          company: 'Depaul University',
          period: 'June 2024 - Nov 2024 | On-Campus',
          description: [
            `Redesigned the department website and internal portal, resulting in 50% faster page load times and a 30%
 increase in user engagement through modern UI/UX principles.`,
            `Implemented an automated CI/CD pipeline with GitHub Actions, cutting deployment time from 2 hours to 15
 minutes while achieving 95% test coverage.`,
            `Secured the internal portal by integrating SSL certification and deploying on a Linux-based server, ensuring PCI
 compliance and zero security incidents.`,
            `Optimized server infrastructure by configuring Nginx load balancers, enhancing system throughput by 40% and
 reducing response time by 60%.`
          ],
          skills: ['Github Actions', 'CI/CD pipeline', 'Nginx', 'Load balancers'],
          icon: 'code'
        },
        {
          title: 'Full Stack Web Developer',
          company: 'Innomatic Research Lab',
          period: 'Fab 2023 - June 2023 | On-Campus',
          description: [
            `Engineered full-stack applications using React.js, Node.js, MongoDB, and Express.js, contributing to a robust and
 scalable codebase`,
            `Optimized existing code for performance and scalability, leading to more efficient application processes.`,
            `Collaborated in code reviews and implemented best practices, ensuring high-quality, maintainable software.`,
          ],
          skills: ['React js', 'Node Js', 'Express js', 'MongoDB'],
          icon: 'code'
        }
      ],
      projects: [
        {
          title: 'Break Reminder Chrome Extension',
          description: [
            "Developed a productivity Chrome extension that transforms boring break reminders into engaging experiences with jokes, quotes, facts, and exercise tips.",
            "Built with React.js and Manifest V3 APIs, featuring background service workers for alarm management and content script injection for seamless user interactions.",
            "Integrated multiple REST APIs (Official Joke API, ZenQuotes, UselessFacts API) with graceful fallback mechanisms ensuring 99.9% content delivery reliability.",
            "Implemented Chrome storage API for user preferences and break tracking with customizable intervals and gamified progress counters.",
            "Published as open-source project demonstrating modern web extension development practices and UX psychology principles."
          ],
          images: [break1, break2, break3, break4],
          skills: ['React.js', 'JavaScript', 'Chrome APIs', 'Manifest V3', 'REST APIs', 'UX Design'],
          githubLink: 'https://github.com/vinodonweb/break-reminder-extraction',
          demoLink: 'https://chromewebstore.google.com/detail/break-reminder/imkkaclpdmkjoebdceipiokgnehkollk'
        },
        {
          title: 'Depaul University IRL Website',
          description: [
            "Redesigned & Redeveloped Depaul University IRL (Ideal Realization Lab) website.",
            "Implemented a modern, responsive interface with React.js for an improved user experience.",
            "Integrated MongoDB for dynamic content management and efficient data retrieval.",
            "Deployed on Digital Ocean for reliable hosting with automated scaling capabilities."
          ],
          images: [irlLogo],
          skills: ['Figma', 'React js', 'MongoDB', 'Digital Ocean'],
          githubLink: '#',
          demoLink: 'https://irl.depaul.edu/'
        },

        {
          title: 'In‑House Task Assignment Web App | Graduate Assistant, DePaul University – IRL Lab',
          description: [
            "Designed and deployed a full‑stack task‑assignment platform (React, ShadCN, Tailwind CSS, Node.js, Express, Docker) that replaced Basecamp and saves ≈ $200 per month in SaaS fees",
            "Implemented secure REST APIs with JWT‑based authentication and bcrypt hashing; enforced role‑based access control (Admin / Employee) to protect sensitive task data.",
            "Integrated the When‑I‑Work API to synchronize employee rosters, eliminating manual data entry and ensuring real‑time accuracy.",
            "Built an intuitive admin dashboard enabling task creation, assignment, status updates, and comment threads; employees receive live updates and can update progress in a click.",
            "Orchestrated CI/CD pipelines (GitHub Actions ➜ Docker) and deployed to DigitalOcean behind a load balancer, adding an extra security layer and achieving >99.9 % uptime.",
          ],
          images: [IRlTodo1, IRlTodo2, IRlTodo3, IRlTodo4, IRlTodo5, IRlTodo6],
          skills: ['Figma', 'React js', 'MongoDB', 'Digital Ocean', 'Docker', 'Load Balancing', 'CI/CD', 'Express', 'Node.js', 'ShadCN', 'Tailwind CSS'],
          githubLink: '#',
          demoLink: 'https://internal.irl.depaul.edu/'
        },
      ],
      certifications: [
        {
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: 'Expecting by June 2025',
          description: 'Validates the ability to design and deploy scalable systems on AWS.'
        },
      ],
    },
    'iOS Developer': {
      title: 'iOS Developer',
      subtitle: 'Specializing in Swift and SwiftUI',
      description: 'I create beautiful and user-friendly iOS applications with Swift and SwiftUI.',
      // experiences: [
      //   {
      //     title: 'iOS Developer',
      //     company: 'Apple Solutions',
      //     period: '2019 - Present',
      //     description: 'Designed and developed iOS applications using Swift and SwiftUI. Implemented clean architecture and modern UI/UX patterns.',
      //     skills: ['Swift', 'SwiftUI', 'UIKit', 'Core Data'],
      //     icon: 'smartphone'
      //   },
      //   {
      //     title: 'Mobile Developer Intern',
      //     company: 'Tech Innovators',
      //     period: '2018 - 2019',
      //     description: 'Assisted in the development of iOS applications and learned best practices for mobile development.',
      //     skills: ['Swift', 'Objective-C', 'iOS SDK'],
      //     icon: 'smartphone'
      //   }
      // ],
      projects: [
        {
          title: 'DoodleDiary – A Mood Tracking Drawing Diary 🎨📝',
          description: [
            "Doodle Diary is an iOS app that lets you create a daily mood journal by drawing a doodle and selecting an emoji-based mood icon for each entry.",
            "Input validation ensures each entry has a title and selected mood before proceeding to the drawing canvas.",
            "Draw freely on the CanvasView; your artwork is saved as a UIImage alongside mood metadata in UserDefaults for lightweight persistence.",
            "Entries appear on a calendar view — dates with saved entries show a blue dot — and tapping a date opens the detailed mood entry scene.",
            "Override prompts prevent accidental data loss when saving over an existing entry; delete functionality confirms removal with an alert.",
            "Seamless UIKit navigation via UINavigationController, combined with custom alerts for success, errors, and overwrite confirmation."
          ],
          images: [doodle1, doodle2, doodle3, doodle4, doodle5, doodle6],
          skills: ['Swift & UIKit with Storyboards', 'Canvas drawing with touch handling and Core Graphics', 'UIDatePicker & custom calendar indicators', 'MVC architecture and lifecycle management'],
          githubLink: 'https://github.com/vinodonweb/doodle-diary-ios',
          demoLink: '#'
        },
        {
          title: 'SortVisualizer – Sorting Algorithm Animator 📊🔢',
          description: [
            "Sorting Visualizer is an iOS app that animates classic sorting algorithms side-by-side on two bar-chart views.",
            "Choose your algorithm (e.g., Bubble, Selection, Insertion, Merge, Quick) and array size via segmented controls for real-time comparison.",
            "Random arrays are generated on demand, then each bar's height animates step-by-step to reflect the algorithm's swaps and comparisons.",
            "Playback controls include start, pause, and reset; animation timing is driven by Timer and DispatchQueue for smooth UI updates.",
            "Chart views use CAShapeLayer (or UIView bars) inside container UIViews for efficient redraws and scaling across device sizes.",
            "Step counters and elapsed-time labels provide insight into each algorithm's performance and complexity."
          ],
          images: [algo1],
          skills: ['Swift & UIKit with Storyboards', 'Timer & DispatchQueue for animation sequencing', 'MVC pattern and view lifecycle handling',],
          githubLink: 'https://github.com/vinodonweb/algo-sorting-ios',
          demoLink: '#'
        }
      ],
      certifications: [
        {
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: 'Expecting by June 2025',
          description: 'Validates the ability to design and deploy scalable systems on AWS.'
        },
      ]
    },
    'Android Developer': {
      title: 'Android Developer',
      subtitle: 'Specializing in Kotlin and Jetpack Compose',
      description: 'I develop innovative Android applications using Kotlin and modern Android development tools.',
      experiences: [],
      projects: [
        {
          title: 'Follow-Me ',
          description: [
            "Follow Me is an Android application that enables real-time location sharing and tracking for group trips, whether traveling by car, bike, or on foot.",
            "Trip Leaders broadcast their GPS coordinates continuously—even in the background—while Trip Followers see live updates on an interactive Google Map.",
            "Each session generates a unique shareable Trip ID, so Followers can join specific trips instantly without manual coordinate entry.",
            "Routes are drawn with polylines and custom markers mark both the starting point and current position for clear visualization.",
            "Built-in trip statistics display elapsed time, total distance traveled, and start timestamp in real time, with options to pause updates or end the trip gracefully.",
            "Under the hood: a bound Service handles location updates, background permissions (`ACCESS_BACKGROUND_LOCATION`) are managed, and data syncs via a custom REST API.",
            "Material Design-inspired UI includes pulsing start/end buttons powered by `ObjectAnimator`, automatic map centering, and seamless Intent-based sharing of Trip IDs."
          ],
          images: [followMe1, followMe2, followMe3],
          skills: ['Java & Android SDK', 'Google Maps API', 'Foreground & Background Location Services', 'REST API integration (JSON parsing)', 'Lifecycle & threading management'],
          githubLink: 'https://github.com/vinodonweb/Follow-Me-android',
          demoLink: '#'
        },
        {
          title: 'CTA Bus Tracker App 🚍',
          description: [
            "CTA Bus Tracker is an Android app that provides real-time CTA bus route information, nearby stop detection, and live arrival predictions using the official CTA Bus Tracker API.",
            "Search and filter all bus routes by name or number with an intuitive TextInputLayout for quick lookup.",
            "Automatically list stops within 1000 meters of your current location using the Fused Location Provider API.",
            "View live arrival times at each stop, pull down to refresh predictions, and tap a prediction to see walking distance to the stop.",
            "Enjoy a smooth UX with a custom splash screen, AlertDialogs for permissions, and polished UI via RecyclerView & ViewPager2.",
            "Reduces API load by caching route and stop data for 24 hours while always fetching fresh prediction data for accuracy.",
            "Monetized with AdMob/Unity Ads integration and styled with custom `helvetica_neue_medium` fonts for a clean look.",
            "Built in Java/Kotlin on Android Studio, leveraging Android Volley for networking and implicit map intents for location previews."
          ],
          images: [cta1, cta2, cta3],
          skills: ['Java/Kotlin & Android SDK', 'Android Volley for networking', 'Fused Location Provider API', 'Real-time JSON parsing & data caching', 'AdMob/Unity Ads integration'],
          githubLink: 'https://github.com/vinodonweb/cta-bus-tracker-android',
          demoLink: '#'
        },
        {
          title: 'News of the World App 📰',
          description: [
            "News of the World is an Android app that retrieves and displays the latest headlines from NewsAPI.org, with support for topic, country, and language filters.",
            "Users can swipe through the top 10 articles for a selected source using ViewPager2, while a Drawer Layout provides quick access to filter settings and source selection.",
            "Each article preview shows title, author, publication date (converted from ISO 8601 to a friendly format), description, and an image placeholder when no image is available.",
            "Tapping an article opens the full story in the device's web browser via an implicit Intent.",
            "Dynamic menus and a professional launcher icon enhance the polished, user-centric experience."
          ],
          images: [news1, news2, news3, news4],
          skills: ['Java/Kotlin & Android SDK', 'Android Volley for networking', 'NewsAPI.org integration & JSON parsing', 'Dynamic UI generation from live API data'],
          githubLink: 'https://github.com/vinodonweb/news-app-android',
          demoLink: '#'
        },
        {
          title: 'Visual Crossing Weather App 🌤️',
          description: [
            "Visual Crossing Weather is an Android app that fetches and displays current conditions, hourly forecasts, and a 15-day outlook using the Visual Crossing Weather API.",
            "Users can view temperature, humidity, UV index, wind speed, and more, all in a clean, Material-inspired interface.",
            "Hourly forecasts are presented in a horizontal RecyclerView, while the 15-day forecast has its own dedicated screen for long-term planning.",
            "The Fused Location API auto-detects your current position, and you can also search for any city to see its weather and map location.",
            "Dynamic gradient backgrounds change based on the current temperature for an immersive visual experience.",
            "Temperature trends are plotted using an integrated graphing library, giving at-a-glance insight into upcoming weather patterns.",
            "Toggle between Fahrenheit and Celsius seamlessly, and share weather details via other apps using implicit Intents.",
            "Connectivity checks ensure graceful handling of network failures, with cached data available when offline."
          ],
          images: [weather1, weather2, weather3, weather4],
          skills: ['Java/Kotlin & Android SDK', 'Android ', 'Visual Crossing Weather API integration & JSON parsing', 'Dynamic gradient backgrounds based on temperature', 'Picasso/Glide for image and icon loading', 'ConnectivityManager for network status handling'],
          githubLink: 'https://github.com/vinodonweb/weather-forecast-android',
          demoLink: '#'
        },
        {
          title: 'Sound Saga ▶️',
          description: [
            "SoundSaga is an Android audiobook player that lets users browse, play, and manage audiobooks in a sleek, grid-based interface with a custom splash screen.",
            "Features a responsive RecyclerView grid layout (2-column portrait, 4-column landscape) powered by GridLayoutManager for intuitive navigation.",
            "Fetches audiobook catalog from a remote JSON endpoint using Volley, with tap-to-open and long-press for detailed info dialogs.",
            "Playback includes chapter swipe navigation, arrow controls, and a SeekBar displaying current and total time.",
            "Supports variable playback speeds (0.75× to 2.0×) through a convenient popup menu for personalized listening.",
            "‘My Books’ tracker saves and restores last-played position and chapter per book for seamless resume from anywhere.",
            "Provides graceful error handling via AlertDialogs for network failures, bad URLs, or playback issues, reverting safely to the main screen."
          ],
          images: [sound1, sound2, sound3, sound4],
          skills: ['Java/Kotlin & Android SDK', 'Splash Screen implementation', 'Gesture-based chapter navigation', 'SharedPreferences for persistent progress tracking', 'AlertDialog for error handling'],
          githubLink: 'https://github.com/vinodonweb/sound-saga-android/',
          demoLink: '#'
        }
      ],
      certifications: [
        // {
        //   title: 'Android Developer Certification',
        //   issuer: 'Google',
        //   date: 'May 2021',
        //   description: 'Professional certification for Android application development using Kotlin.'
        // },
        {
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: 'Expecting by June 2025',
          description: 'Validates the ability to design and deploy scalable systems on AWS.'
        }
      ]
    }
  };

  const currentRoleData = roleContent[selectedRole];

  return (
    <div className="bg-[#121212] text-white min-h-screen">

      {/* Scroll animation handler */}
      <ScrollObserver />

      {/* Role Switcher */}
      <RoleSwitcher onRoleChange={handleRoleChange} activeRole={selectedRole} />

      {/* Header/Navigation */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-[#121212]/80 py-4 px-6 flex justify-between items-center border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Vinod Sharma
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {['home', 'experience', 'projects', 'skills', 'certifications', 'contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="hover:text-blue-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* Hero Section */}
      <AnimatedSection
        id="home"
        className="min-h-screen flex flex-col items-center justify-center bg-[#121212] py-20"
        noStagger={true}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Vinod Sharma
            </motion.h1>
            <AnimatedTitle
              text={currentRoleData.title}
              className="text-2xl md:text-3xl font-medium mb-8 text-blue-500"
              delay={0.5}
            />
            <AnimatedParagraph
              text={currentRoleData.description}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              delay={0.8}
            />
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <RainbowButton
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </RainbowButton>
              <RainbowButton
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </RainbowButton>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection
        id="experience"
        className="min-h-screen bg-[#0a0a0a] py-20"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="My Experience"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentRoleData.experiences && currentRoleData.experiences.map((exp, index) => (
            <AnimatedCard key={index} delay={index} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="flex items-center mb-4">
                {exp.icon === 'code' && <AnimatedIcon icon={Code} color="text-blue-500 w-8 h-8 mr-3" delay={index * 0.2} />}
                {exp.icon === 'smartphone' && <AnimatedIcon icon={Smartphone} color="text-blue-500 w-8 h-8 mr-3" delay={index * 0.2} />}
                {exp.icon === 'server' && <AnimatedIcon icon={Server} color="text-blue-500 w-8 h-8 mr-3" delay={index * 0.2} />}
                <div>
                  <AnimatedHeading tag="h3" text={exp.title} className="text-xl font-semibold" delay={0.1} />
                  <AnimatedHeading tag="p" text={`${exp.company} | ${exp.period}`} className="text-gray-400" delay={0.2} />
                </div>
              </div>
              {Array.isArray(exp.description) ? (
                <div className="text-gray-300 mb-4 space-y-2">
                  {exp.description.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-sm"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              ) : (
                <AnimatedParagraph text={exp.description} className="text-gray-300 mb-4" delay={0.3} />
              )}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + skillIndex * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </AnimatedCard>
          ))}

          {(!currentRoleData.experiences || currentRoleData.experiences.length === 0) && (
            <div className="col-span-2 text-center py-12">
              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                No experience data available for {currentRoleData.title}.
              </motion.p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection
        id="projects"
        className="min-h-screen bg-[#121212] py-20"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="Featured Projects"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentRoleData.projects.map((project, index) => (
            <AnimatedProject key={index} delay={index} className="bg-[#1a1a1a]  rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-blue-600 transition-colors">
              {project.images ? (
                <ImageCarousel images={project.images} />
              ) : (
                <motion.div
                  className="h-64 bg-gray-800 flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <p className="text-gray-400">No images available</p>
                </motion.div>
              )}
              <div className="p-6">
                <AnimatedHeading tag="h3" text={project.title} className="text-xl font-semibold mb-2" delay={0.1} />
                {Array.isArray(project.description) ? (
                  <div className="text-gray-300 mb-4 space-y-2">
                    {project.description.map((paragraph, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="text-sm"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                ) : (
                  <AnimatedParagraph text={project.description} className="text-gray-300 mb-4" delay={0.2} />
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + skillIndex * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 flex items-center"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </motion.a>
                  <motion.a

                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${project.demoLink.includes('#') ? 'd-none hidden' : ''} text-blue-500 hover:text-blue-400 flex items-center`}
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Demo
                  </motion.a>
                </div>
              </div>
            </AnimatedProject>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills Section with Animated Icons */}
      <AnimatedSection
        id="skills"
        className="min-h-screen bg-[#0a0a0a] py-20"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="Technical Skills"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Front-end */}
          <AnimatedCard delay={0} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <AnimatedHeading tag="h3" text="Front-end" className="text-xl font-semibold mb-4 text-blue-500" />
            <ul className="space-y-4">
              {['React & React Native', 'HTML5 & CSS3', 'JavaScript & TypeScript', 'Tailwind CSS', 'Redux'].map((skill, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FloatingIcon icon={ArrowRight} color="text-blue-500 w-5 h-5 mr-3" />
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedCard>

          {/* Back-end */}
          <AnimatedCard delay={0.2} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <AnimatedHeading tag="h3" text="Back-end" className="text-xl font-semibold mb-4 text-blue-500" />
            <ul className="space-y-4">
              {['Node.js & Express', 'MongoDB & MySQL', 'RESTful APIs', 'Firebase', 'GraphQL'].map((skill, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <FloatingIcon icon={ArrowRight} color="text-blue-500 w-5 h-5 mr-3" />
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedCard>

          {/* Mobile */}
          <AnimatedCard delay={0.4} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <AnimatedHeading tag="h3" text="Mobile Development" className="text-xl font-semibold mb-4 text-blue-500" />
            <ul className="space-y-4">
              {['Swift & SwiftUI', 'Kotlin & Jetpack Compose', 'React Native', 'Flutter', 'Native iOS & Android Development'].map((skill, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <FloatingIcon icon={ArrowRight} color="text-blue-500 w-5 h-5 mr-3" />
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection
        id="certifications"
        className="min-h-screen bg-[#121212] py-20"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="Certifications"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        />
        <div className="max-w-4xl mx-auto">
          <AnimatedCard className="mb-8 bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-gray-800">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-4 md:gap-0" data-iframe-width="350" data-iframe-height="270" data-share-badge-id="3f1b7229-c63c-46ca-a005-0228cddef2b8" data-share-badge-host="https://www.credly.com">
            </div>
            <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        id="contact"
        className="min-h-screen bg-[#0a0a0a] py-20"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="Get In Touch"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        />
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <AnimatedCard delay={0.1} className="space-y-6">
              <AnimatedHeading tag="h3" text="Contact Information" className="text-xl font-semibold" />
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <FloatingIcon icon={Mail} color="text-blue-500 w-5 h-5 mr-3" />
                <motion.a
                  href="mailto:your.email@example.com"
                  className="text-gray-300 hover:text-blue-500"
                  whileHover={{ scale: 1.02, x: 3 }}
                >
                  work.vinodsharma23@gmail.com
                </motion.a>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <FloatingIcon icon={Github} color="text-blue-500 w-5 h-5 mr-3" />
                <motion.a
                  href="https://github.com/vinodonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-500"
                  whileHover={{ scale: 1.02, x: 3 }}
                >
                  github.com/vinodonweb
                </motion.a>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <FloatingIcon icon={Linkedin} color="text-blue-500 w-5 h-5 mr-3" />
                <motion.a
                  href="https://linkedin.com/in/vinodonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-500"
                  whileHover={{ scale: 1.02, x: 3 }}
                >
                  linkedin.com/in/vinodonweb
                </motion.a>
              </motion.div>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-gray-800">
              <AnimatedParagraph
                text="Interested in working together? Send me a message!"
                className="text-center text-gray-300 mb-6"
              />
              <RainbowButton
                onClick={() => window.location.href = 'mailto:work.vinodsharma23@gmail.com'}
                className="block w-full"
              >
                Send Email
              </RainbowButton>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <motion.footer
        className="bg-[#0a0a0a] py-6 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="container mx-auto px-6 text-center">
          <AnimatedParagraph
            text={`© ${new Date().getFullYear()} Vinod Sharma. All rights reserved.`}
            className="text-gray-400"
          />
        </div>
      </motion.footer>
    </div>
  );
}

export default App
