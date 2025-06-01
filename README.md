![Background](https://github.com/junxiancheh/InterSync/blob/4cfab1aeb8adf51c4c4eb9082ca57007ae042bac/assets/Intersync%20logo.png)
# InterSync
Team Name: InterSync
Team Member: Cheh Jun Xian, Palaniappan Kannappan

Proposed Level of Achievement: Apollo 11

**Project Poster**: [Link](https://drive.google.com/file/d/1zr5ZpEGZxX6DzhqKcl3pGvZAROrLLeBX/view)

**Project Video**: [Link](https://drive.google.com/file/d/1tF2hja98PHN4CFZccdPgOI25qJePA_pV/view?usp=sharing)


## Motivation 
As the founders of Interdesk, we started out with a mission to promote ergonomics in homes and office spaces. In today's work environment, prolonged sitting has become a major health concern, contributing to issues like poor posture, back pain, and decreased productivity. While our adjustable desks offer a solution, we realized that many users struggle to maintain a consistent routine of switching between sitting and standing and thus they do not fully leverage the health benefits these desks can offer. Many people set up their desks with the intention to be more active, but without the right reminders, it's easy to slip back into old habits. This leads to missed opportunities for better posture, improved circulation, and overall health.

We have heard from many of our customers that they would actually prefer an app to control the desk and set custom reminders and automatic adjustments forcing them to get into a healthy routine. Some have also mentioned that insights on how long they have spent at the desk will aid in improving their lifestyle too.

That’s why we will be taking it a step further. We are developing a smart, user-friendly mobile application that seamlessly integrates with adjustable desks, allowing users to remotely control their desks, set personalized reminders, and track their movement habits. By leveraging technology, we are making ergonomic workspaces smarter, more intuitive, and tailored to individual needs.

To enable seamless remote control, we will design a custom add-on for the desk's controller. This will connect the desk to the mobile application. By tailoring our solution to different user needs, we aim to create a smarter, more intuitive workspace that promotes well-being and productivity.

## Aims
We aim to develop a smart mobile application which enables users to remotely adjust their desk’s height via an app, provide customizable timers and notification to remind users when to sit or stand, offer activity tracking to monitor time spent sitting and standing, and allow users to set personalized movement goals based on their work style and health needs.

We also aim to design the app with a clean, minimalist layout to reduce cognitive load and ensure that users can quickly access the features they need. Key features like adjusting desk height, setting timers, and tracking activity will be easily accessible through simple navigation flows. The use of icons, clear labels, and color-coded notifications will make it straightforward for users to understand and interact with the app.

## User Stories
As a working adult, I want to set custom sitting and standing timers, so I receive reminders to switch positions at my preferred intervals.

As a working adult, I want to track my sitting and standing habits, so I can monitor my activity and improve my health over time.

As an office manager, I want to track the sit-stand habits of employees, so I can promote a healthier workplace culture.

As an office manager, I want to manage multiple desks in a shared workspace, so I can assign height presets for different users. 


## Features
Feature 1 (core): Adjusting desk’s height

Feature 2 (core): Notification to alert users to stand 

Feature 3 (core): Activity tracking

Feature 4 (extension): Goals tracker


## Timeline
## **Milestone 1 (2 June)** - Technical proof of concept (A minimal working system with both the frontend and the backend integrated for a very simple feature)

Establish wireless communication between app and arduino

Build a simple arduino and servos which can press the controller (without housing and proper 3D printed buttons)

Build a basic UI to enable interaction with the desk, showcasing clear controls for adjusting height.

Implement basic functionality to control the desk height remotely through the mobile app.

## **Milestone 2 (30 June)** - Prototype (A working system with the core features)

Include a clock and timer feature within the app to track the time spent sitting and standing.

Creation of custom sit/stand timers and notification.

Stable wireless connectivity to ensure reliable response times

3D print the housing for the arduino and servos to attach the controller. Build the add-on with the arduino and servos in the housing with necessary connections

## **Milestone 3 (28 July)** - Extended system (A working system with both the core + extension features)
Personalized goal setting includes adaptive recommendations based on user behavior

Goals tracker which will track whether user has achieved their sitting/standing goals

Hardware integration improvements which includes optimized controller response & compatibility

Refine frontend UI/UX design to increase engagement.

## **Milestone 4 (27 August)** - Final Refinement (Polish the system for reliability, usability, and performance.)

Bug fixes and UI/UX refinements to ensure smooth user experience

Final testing and optimization to ensure stability and readiness for evaluation


## Tech Stack
React

Node.js

Arduino/ESP32

Servomotor

3D printer

Bluetooth/WiFi

