"use client";
import Link from "next/link";
import React from "react";

const ChatAIBtn = () => {
  return (
    <div className="fixed opacity-100 z-50 right-10 bottom-10">
      <button>
        <Link href="https://chat.openai.com/" target="_blank">
          <p className="bn5 hover:font-bold">Chat with Trello AI 2.0</p>
        </Link>
      </button>
      <style jsx>
        {`
          .bn5 {
            padding: 0.6em 2em;
            border: none;
            outline: none;
            color: rgb(255, 255, 255);
            background: #111;
            cursor: pointer;
            position: relative;
            z-index: 0;
            border-radius: 10px;
          }

          .bn5:before {
            content: "";
            background: linear-gradient(
              45deg,
              #ff0000,
              #ff7300,
              #fffb00,
              #48ff00,
              #00ffd5,
              #002bff,
              #7a00ff,
              #ff00c8,
              #ff0000
            );
            position: absolute;
            top: -2px;
            left: -2px;
            background-size: 400%;
            z-index: -1;
            filter: blur(5px);
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            animation: glowingbn5 20s linear infinite;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            border-radius: 10px;
          }

          @keyframes glowingbn5 {
            0% {
              background-position: 0 0;
            }
            50% {
              background-position: 400% 0;
            }
            100% {
              background-position: 0 0;
            }
          }

          .bn5:active {
            color: #000;
          }

          .bn5:active:after {
            background: transparent;
          }

          /* Default style for mobile screens */
          .bn5:before {
            opacity: 1;
          }

          .bn5:after {
            z-index: -1;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: #191919;
            left: 0;
            top: 0;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default ChatAIBtn;
