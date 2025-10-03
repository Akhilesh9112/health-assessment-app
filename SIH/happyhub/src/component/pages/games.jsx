import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// No separate CSS file is needed when using Tailwind CSS like this.

// --- MOCK DATA ---
// Manually replaced all images with hand-picked, game-themed pictures to ensure relevance and reliability.
const mockGames = [
  // Games with more attractive, relevant images from a stable API
  { id: 1, title: "Color Weave", description: "Connect matching colors to create beautiful, flowing patterns.", thumbnail: "[https://images.unsplash.com/photo-1557683316-9a7a4a8ab3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1557683316-9a7a4a8ab3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus", "🧘 Promotes Calm"], launchUrl: "[https://www.online-solitaire.com/](https://www.online-solitaire.com/)" },
  { id: 2, title: "Zen Blocks", description: "Arrange falling blocks to create clean lines and clear your mind.", thumbnail: "[https://images.unsplash.com/photo-1580582932707-520aed93a94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1580582932707-520aed93a94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://tetris.com/play-tetris](https://tetris.com/play-tetris)" },
  { id: 3, title: "Pixel Painter", description: "A relaxing digital coloring book with intricate pixel art designs.", thumbnail: "[https://images.unsplash.com/photo-1593433362947-a3d537a7f45b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1593433362947-a3d537a7f45b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity", "🧘 Promotes Calm"], launchUrl: "[https://www.pixilart.com/draw](https://www.pixilart.com/draw)" },
  { id: 4, title: "Starlight Path", description: "Connect the stars to reveal beautiful constellations in the night sky.", thumbnail: "[https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.addictinggames.com/puzzle/star-constellation](https://www.addictinggames.com/puzzle/star-constellation)" },
  { id: 5, title: "Sound Scape", description: "Mix and match ambient sounds like rain and wind to create a calming atmosphere.", thumbnail: "[https://images.unsplash.com/photo-1499914485622-2b62fac55398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1499914485622-2b62fac55398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://asoftmurmur.com/](https://asoftmurmur.com/)" },
  { id: 6, title: "Garden Builder", description: "Design and grow your own peaceful zen garden without any pressure.", thumbnail: "[https://images.unsplash.com/photo-1542845938-232997669b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1542845938-232997669b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity", "🧘 Promotes Calm"], launchUrl: "[https://store.steampowered.com/app/1915300/Gardener/](https://store.steampowered.com/app/1915300/Gardener/)" },
  { id: 7, title: "Flowing Lines", description: "Rotate tiles to connect all the lines into a single, seamless flow.", thumbnail: "[https://images.unsplash.com/photo-1501003878151-d3cb86b64bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1501003878151-d3cb86b64bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus", "🧘 Promotes Calm"], launchUrl: "[https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/net.html](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/net.html)" },
  { id: 8, title: "Rhythm Tap", description: "Tap along to calming, ambient music tracks and find your rhythm.", thumbnail: "[https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://typedrummer.com/](https://typedrummer.com/)" },
  { id: 9, title: "Sandbox City", description: "Build a tiny, peaceful city with no goals or pressure. Just create.", thumbnail: "[https://images.unsplash.com/photo-1593902821215-0d42bba407a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1593902821215-0d42bba407a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://oskarstalberg.com/Townscaper/](https://oskarstalberg.com/Townscaper/)" },
  { id: 10, title: "Logic Squares", description: "Use logic to fill in the grid and reveal a hidden picture.", thumbnail: "[https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.puzzles-nonograms.com/](https://www.puzzles-nonograms.com/)" },
  { id: 11, title: "Sudoku Zen", description: "A classic logic puzzle with a clean, calming interface.", thumbnail: "[https://images.unsplash.com/photo-1618335829737-2228f0902c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1618335829737-2228f0902c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://sudoku.com/](https://sudoku.com/)" },
  { id: 12, title: "Digital Pottery", description: "Sculpt and paint your own unique pottery in a virtual studio.", thumbnail: "[https://images.unsplash.com/photo-1571173729423-9a3d13c839d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1571173729423-9a3d13c839d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://apps.apple.com/us/app/pottery-game/id1496306527](https://apps.apple.com/us/app/pottery-game/id1496306527)" },
  { id: 13, title: "Water Ripples", description: "Touch the screen to create calming ripples in a virtual pond.", thumbnail: "[https://images.unsplash.com/photo-1500373994708-4d781477144e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1500373994708-4d781477144e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://madebyevan.com/webgl-water/](https://madebyevan.com/webgl-water/)" },
  { id: 14, title: "Jigsaw Planet", description: "Solve thousands of beautiful jigsaw puzzles at your own pace.", thumbnail: "[https://images.unsplash.com/photo-1564951434112-9423445c9222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1564951434112-9423445c9222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus", "🧘 Promotes Calm"], launchUrl: "[https://www.jigsawplanet.com/](https://www.jigsawplanet.com/)" },
  { id: 15, title: "Sand Art", description: "Create colorful layers of sand in a virtual bottle for a satisfying effect.", thumbnail: "[https://images.unsplash.com/photo-1506793542335-a0445f053538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1506793542335-a0445f053538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://thisissand.com/](https://thisissand.com/)" },
  { id: 16, title: "Bubble Wrap Pop", description: "The simple, endless satisfaction of popping virtual bubble wrap.", thumbnail: "[https://images.unsplash.com/photo-1608148325883-2df42155a371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1608148325883-2df42155a371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.faketrumptweet.com/bubble-wrap](https://www.faketrumptweet.com/bubble-wrap)" },
  { id: 17, title: "2048", description: "Slide numbered tiles to combine them and reach the 2048 tile.", thumbnail: "[https://images.unsplash.com/photo-1550953187-873d325b3949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1550953187-873d325b3949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://play2048.co/](https://play2048.co/)" },
  { id: 18, title: "Flame Painter", description: "Paint with mesmerizing, generative flame-like brushes.", thumbnail: "[https://images.unsplash.com/photo-1554522961-26f5358971f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1554522961-26f5358971f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://www.escapemotions.com/experiments/flame/](https://www.escapemotions.com/experiments/flame/)" },
  { id: 19, title: "Infinite Zoom", description: "An endlessly zooming piece of art that's fascinating to explore.", thumbnail: "[https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://zoomquilt.org/](https://zoomquilt.org/)" },
  { id: 20, title: "Word Search", description: "Find hidden words in a grid of letters. A classic brain teaser.", thumbnail: "[https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://thewordsearch.com/](https://thewordsearch.com/)" },
  { id: 21, title: "Silk Weave", description: "Draw beautiful, flowing symmetrical patterns with your cursor.", thumbnail: "[https://images.unsplash.com/photo-1543340845-77c8e0a30440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1543340845-77c8e0a30440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[http://weavesilk.com/](http://weavesilk.com/)" },
  { id: 22, title: "Virtual Koi Pond", description: "Watch and interact with graceful koi fish in a serene pond.", thumbnail: "[https://images.unsplash.com/photo-1523438438421-3a95d528b173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1523438438421-3a95d528b173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://codepen.io/TqWx/full/QjYWWZ](https://codepen.io/TqWx/full/QjYWWZ)" },
  { id: 23, title: "Unblock Me", description: "Slide blocks out of the way to free the red block from the puzzle.", thumbnail: "[https://images.unsplash.com/photo-1618335829737-2228f0902c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1618335829737-2228f0902c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.addictinggames.com/puzzle/unblock-me](https://www.addictinggames.com/puzzle/unblock-me)" },
  { id: 24, title: "Music Box", description: "Compose your own simple, charming melodies on a virtual music box.", thumbnail: "[https://images.unsplash.com/photo-1510915361894-db8b60106941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1510915361894-db8b60106941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://musicbox.fun/](https://musicbox.fun/)" },
  { id: 25, title: "Cloud Spotting", description: "Relax and watch beautifully rendered, procedurally generated clouds drift by.", thumbnail: "[https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.shadertoy.com/view/XslGRr](https://www.shadertoy.com/view/XslGRr)" },
  { id: 26, title: "Mahjong Solitaire", description: "Match open pairs of identical tiles to clear the board.", thumbnail: "[https://images.unsplash.com/photo-1601050692255-322a842d76e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1601050692255-322a842d76e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://mahjongsolitaire.com/](https://mahjongsolitaire.com/)" },
  { id: 27, title: "Newton's Cradle", description: "A simple physics toy. Click and watch the soothing, repetitive motion.", thumbnail: "[https://images.unsplash.com/photo-1556742054-c81b2a95c443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1556742054-c81b2a95c443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://codepen.io/aakashrodrigues/full/pPqPrE](https://codepen.io/aakashrodrigues/full/pPqPrE)" },
  { id: 28, title: "House Decorator", description: "Design and furnish rooms in a simple, relaxing drag-and-drop game.", thumbnail: "[https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://www.homestyler.com/](https://www.homestyler.com/)" },
  { id: 29, title: "Sliding Puzzle", description: "Slide the tiles around to reassemble the picture in the correct order.", thumbnail: "[https://images.unsplash.com/photo-1566411520864-2192ca2a5963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1566411520864-2192ca2a5963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/fifteen.html](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/fifteen.html)" },
  { id: 30, title: "Virtual Fireplace", description: "Enjoy the calming crackle and visuals of a digital fireplace.", thumbnail: "[https://images.unsplash.com/photo-1603217041434-c02a08a2a4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1603217041434-c02a08a2a4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.youtube.com/watch?v=L_LUpnjgPso](https://www.youtube.com/watch?v=L_LUpnjgPso)" },
  { id: 31, title: "Connect the Dots", description: "Reveal a hidden image by connecting numbered dots in sequence.", thumbnail: "[https://images.unsplash.com/photo-1531346910609-9b990025a59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1531346910609-9b990025a59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.thecolor.com/online-coloring/connect-the-dots.aspx](https://www.thecolor.com/online-coloring/connect-the-dots.aspx)" },
  { id: 32, title: "Character Creator", description: "Design your own unique characters with a wide array of options.", thumbnail: "[https://images.unsplash.com/photo-1609102249781-dd65022e35e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1609102249781-dd65022e35e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://picrew.me/](https://picrew.me/)" },
  { id: 33, title: "Breathing Exercise", description: "Follow the visual guide to practice calming breathing techniques.", thumbnail: "[https://images.unsplash.com/photo-1528722828614-77b960ca088d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1528722828614-77b960ca088d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://xhalr.com/](https://xhalr.com/)" },
  { id: 34, title: "Hexa Puzzle", description: "Fit hexagonal blocks into the grid to solve the puzzle.", thumbnail: "[https://images.unsplash.com/photo-1590215287431-a465c192c286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1590215287431-a465c192c286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://poki.com/en/g/super-hex-puzzle](https://poki.com/en/g/super-hex-puzzle)" },
  { id: 35, title: "Digital Weaving", description: "Create intricate patterns by weaving virtual threads.", thumbnail: "[https://images.unsplash.com/photo-1519705433221-cf113538a7c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1519705433221-cf113538a7c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://matthewcp.com/loom/](https://matthewcp.com/loom/)" },
  { id: 36, title: "Minimalist Golf", description: "A simple, calming golf game with relaxing physics and sounds.", thumbnail: "[https://images.unsplash.com/photo-1600161513361-b3b708b7923a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1600161513361-b3b708b7923a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.crazygames.com/game/mini-golf-club](https://www.crazygames.com/game/mini-golf-club)" },
  { id: 37, title: "Water Sort Puzzle", description: "Sort colored water in the tubes until each tube has one color.", thumbnail: "[https://images.unsplash.com/photo-1541795795328-f073b7629934?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1541795795328-f073b7629934?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://poki.com/en/g/water-sort-puzzle](https://poki.com/en/g/water-sort-puzzle)" },
  { id: 38, title: "Poetry Magnets", description: "Arrange words on a virtual fridge to create poems and phrases.", thumbnail: "[https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://fridgemagnets.online/](https://fridgemagnets.online/)" },
  { id: 39, title: "Digital Dominoes", description: "Set up and topple intricate lines of virtual dominoes.", thumbnail: "[https://images.unsplash.com/photo-1566694271355-630a0127593c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1566694271355-630a0127593c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.crazygames.com/game/domino-chain](https://www.crazygames.com/game/domino-chain)" },
  { id: 40, title: "Crossword", description: "Fill in the words to solve the puzzle. A timeless classic.", thumbnail: "[https://images.unsplash.com/photo-1562911791-c9a17382580e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1562911791-c9a17382580e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.dictionary.com/e/crossword/](https://www.dictionary.com/e/crossword/)" },
  { id: 41, title: "Pattern Match", description: "Memorize and replicate increasingly complex patterns.", thumbnail: "[https://images.unsplash.com/photo-1525936746859-e97758de772d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1525936746859-e97758de772d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.crazygames.com/game/simon](https://www.crazygames.com/game/simon)" },
  { id: 42, title: "Virtual Spirograph", description: "Create intricate geometric drawings with a digital spirograph.", thumbnail: "[https://images.unsplash.com/photo-1629196911294-2e6f4f22f7b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1629196911294-2e6f4f22f7b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://nathan.fi/spiro/](https://nathan.fi/spiro/)" },
  { id: 43, title: "Cat Purr Generator", description: "Listen to the calming, continuous purr of a cat.", thumbnail: "[https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://purrli.com/](https://purrli.com/)" },
  { id: 44, title: "Minesweeper", description: "Use logic to clear the board without detonating any hidden mines.", thumbnail: "[https://images.unsplash.com/photo-1631031587592-b71a01799d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1631031587592-b71a01799d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://minesweeperonline.com/](https://minesweeperonline.com/)" },
  { id: 45, title: "Landscape Painter", description: "Paint serene landscapes with a simple, intuitive toolset.", thumbnail: "[https://images.unsplash.com/photo-1506812574058-fc75b1bc36d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1506812574058-fc75b1bc36d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://www.escapemotions.com/experiments/rebelle/](https://www.escapemotions.com/experiments/rebelle/)" },
  { id: 46, title: "Aquarium", description: "A beautiful, customizable virtual aquarium to watch and relax.", thumbnail: "[https://images.unsplash.com/photo-1522069169874-c58ec4b76259?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1522069169874-c58ec4b76259?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.fishgl.com/](https://www.fishgl.com/)" },
  { id: 47, title: "Spot the Difference", description: "Find all the differences between two nearly identical images.", thumbnail: "[https://images.unsplash.com/photo-1578847942199-31c3b1defa49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1578847942199-31c3b1defa49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://www.puzzles-games.net/spot-the-differences.html](https://www.puzzles-games.net/spot-the-differences.html)" },
  { id: 48, "title": "City Planner", "description": "Draw roads and watch a minimalist city grow around them.", "thumbnail": "[https://images.unsplash.com/photo-1549887552-cb13756d5e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1549887552-cb13756d5e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", "category": "🎨 Creative Escape", "tags": ["🎨 Sparks Creativity"], "launchUrl": "[https://anvaka.github.io/city-roads/](https://anvaka.github.io/city-roads/)" },
  { id: 49, title: "Paper Fold", description: "Fold a virtual piece of paper to match the target shape.", thumbnail: "[https://images.unsplash.com/photo-1598024483738-95886317b3a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1598024483738-95886317b3a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧠 Focus & Flow", tags: ["🧠 Improves Focus"], launchUrl: "[https://poki.com/en/g/paper-fold](https://poki.com/en/g/paper-fold)" },
  { id: 50, title: "Zen Slicer", description: "Slice objects with a satisfying swish. No points, no pressure.", thumbnail: "[https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🧘 Mindful Relaxation", tags: ["🧘 Promotes Calm"], launchUrl: "[https://www.crazygames.com/game/fruit-ninja](https://www.crazygames.com/game/fruit-ninja)" },
  { id: 51, title: "Alchemy", description: "Combine basic elements like fire and water to discover new items.", thumbnail: "[https://images.unsplash.com/photo-1630713824342-a82151640a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1630713824342-a82151640a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80)", category: "🎨 Creative Escape", tags: ["🎨 Sparks Creativity"], launchUrl: "[https://littlealchemy2.com/](https://littlealchemy2.com/)" },
];

const mockVideos = [
    {id: 1, title: "4K Relaxing River", description: "Enjoy the peaceful sounds and sights of a mountain river.", videoId: "mPZkdNFkNps"},
    {id: 2, title: "Peaceful Japanese Garden", description: "Find your zen in this stunningly beautiful garden tour.", videoId: "h_h_8-f2ifg"},
    {id: 3, title: "Calming Jellyfish Aquarium", description: "Let your worries float away while watching these graceful jellyfish.", videoId: "Qco403NnyhY"},
    {id: 4, title: "8 Hours of Relaxing Sleep Music", description: "Soft piano music and soothing strings for deep relaxation.", videoId: "1-665n2RUOA"},
];

const gameCategories = ["All", "🧠 Focus & Flow", "🎨 Creative Escape", "🧘 Mindful Relaxation"];

// --- Child Components (with Tailwind CSS) ---

function GameModal({ url, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}>
      <div className="relative w-[90%] h-[90%] max-w-6xl bg-white rounded-xl p-2 md:p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-none bg-[#f4a261] text-white text-2xl font-bold cursor-pointer z-50 flex items-center justify-center transition-transform hover:scale-110" 
          onClick={onClose}
        >
          &times;
        </button>
        <iframe src={url} title="Game" className="w-full h-full rounded-lg" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
}

function GameCard({ game, onPlay }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden text-left flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <div className="w-full h-48 bg-gray-200">
        <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
        <p className="text-gray-600 mt-2 flex-grow">{game.description}</p>
        <div className="flex flex-wrap gap-2 my-4">
          {game.tags.map(tag => (
            <span key={tag} className="bg-gray-100 py-1 px-3 rounded-full text-xs text-gray-700">{tag}</span>
          ))}
        </div>
        <button 
          className="mt-auto py-3 px-5 bg-[#f4a261] text-white border-none rounded-lg text-base font-bold cursor-pointer transition-colors duration-300 hover:bg-[#e76f51]" 
          onClick={() => onPlay(game.launchUrl)}
        >
          Play Now
        </button>
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const videoSrc = `https://www.youtube.com/embed/${video.videoId}`;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden text-left flex flex-col">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <iframe src={videoSrc} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
    </div>
  );
}

// --- Main Page Component (with Tailwind CSS) ---

function ChillZonePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);

  const handlePlayGame = (url) => {
    // For YouTube links, we want to embed them directly. For others, we open in a new tab for better compatibility.
    if (url.includes("youtube.com")) {
      const videoId = new URL(url).searchParams.get('v');
      setSelectedGameUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setSelectedGameUrl(url);
    }
  };

  const handleCloseModal = () => {
    setSelectedGameUrl(null);
  };

  const filteredGames = activeFilter === "All"
    ? mockGames
    : mockGames.filter(game => game.category === activeFilter);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans text-center min-h-screen pt-20">
      <header className="bg-gradient-to-br from-[#aec6cf] to-[#b3e2d5] py-16 px-5 text-white relative">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Find Your Calm, One Game at a Time.</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">Our curated collection of games is designed to help you de-stress and find a moment of peace.</p>
        <Link to="/hobbies">
          <button className="py-3 px-6 bg-white text-[#f4a261] font-bold rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            Try Relaxing Videos
          </button>
        </Link>

         
      </header>
      
      <main>
        <section className="py-12 px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mindful Games</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2 mb-6">What kind of relief are you looking for?</p>
          <div className="flex justify-center flex-wrap gap-4 mt-5">
            {gameCategories.map(category => (
              <button
                key={category}
                className={`py-2 px-5 border border-[#aec6cf] bg-transparent text-gray-800 rounded-full cursor-pointer text-base transition-all duration-300 ease-in-out hover:bg-[#b3e2d5] hover:border-[#b3e2d5] hover:text-white ${activeFilter === category ? 'bg-[#f4a261] border-[#f4a261] text-white font-bold' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:p-10 max-w-7xl mx-auto">
          {filteredGames.map(game => <GameCard key={game.id} game={game} onPlay={handlePlayGame} />)}
        </section>

        {/* New Video Section */}
        <section className="py-12 px-5 bg-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Relaxing Video Escapes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2 mb-10">Unwind with these calming visual and audio experiences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {mockVideos.map(video => <VideoCard key={video.id} video={video}/>)}
            </div>
        </section>
      </main>

      {selectedGameUrl && <GameModal url={selectedGameUrl} onClose={handleCloseModal} />}
    </div>
  );
}

export default ChillZonePage;

