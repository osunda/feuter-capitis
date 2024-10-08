"use client";

import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

const words = ["investing", "analyzing", "modeling", "wealth"];

const keyFeatures = [
  {
    title: "Child's play",
    description: "We offer a dynamic, noob friendly user experience."
  },
  {
    title: "Fresh off the web",
    description: "We use live, real time data to track top companies."
  },
  {
    title: "Everchanging functions",
    description: "Our platform is constantly evolving with new features."
  }
];

const Home: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const idleDelay = 1500; // Duration to wait before blinking starts

    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentWord === words[wordIndex]) {
      // Word completed, set to idle after a delay
      timeout = setTimeout(() => {
        setIsIdle(true);
        setIsDeleting(true);
      }, idleDelay);
    } else if (isDeleting && currentWord === '') {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        const fullWord = words[wordIndex];
        const updatedWord = isDeleting
          ? fullWord.substring(0, currentWord.length - 1)
          : fullWord.substring(0, currentWord.length + 1);
        setCurrentWord(updatedWord);
        setIsIdle(false);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, wordIndex]);

  const getCursorClass = () => {
    if (isIdle) {
      return 'animate-blink-slow';
    } else if (!isDeleting && currentWord === words[wordIndex]) {
      return 'animate-flash-fast';
    }
    return '';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[85vh] flex flex-col justify-center pl-4 sm:pl-8">
        <div className="w-[66.67vw] mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Feuter <span className="text-[#00674F]">capitis</span>, democratizing{' '}
            <span className="relative inline-block">
              {currentWord}
              <span
                className={`absolute left-full -ml-0.5 w-[3px] h-full bg-black ${getCursorClass()}`}
                style={{ top: '0.1em' }}
              ></span>
            </span>
          </h1>
          <p className="text-2xl text-gray-700 mb-10 leading-relaxed">Want an in-depth analysis of a company? Want to pick the next big stock? You've come to the right place.</p>
          <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-xl font-medium transition duration-300 ease-in-out">
            Get Started
          </button>
        </div>
      </div>

      <div className="min-h-screen flex items-center pl-4 sm:pl-8">
        <div className="w-full">
          <h2 className="text-5xl font-bold mb-6">Key Features</h2>
          <div className="flex justify-between">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="w-1/3 px-4">
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
