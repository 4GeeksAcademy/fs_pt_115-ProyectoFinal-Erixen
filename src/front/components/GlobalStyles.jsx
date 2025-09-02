import React from 'react';

export const GlobalStyles = () => (
    <style>{`
    :root {
      --color-primary: #219EBC;
      --color-secondary: #023047;
      --color-info: #FFB703;
      --color-warning: #FB8500;
      --color-bg: #f8f9fa;
      --color-text: #212529;
    }
    html, body {
    overflow: hidden;
}
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      background-color: var(--color-bg);
      color: var(--color-text);
    }

    .app-container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
      z-index: 10;
    }

    .header-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-secondary);
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .main-content {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 80px);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .hero-content {
      max-width: 800px;
      padding: 2rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #6c757d;
    }

    .animated-bg-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      width: 300px;
      height: 300px;
      z-index: -1;
    }

    .animate-blob {
      animation: blob-animation 15s infinite alternate;
    }

    .animation-delay-2000 {
      animation-delay: -2s;
    }

    .animation-delay-4000 {
      animation-delay: -4s;
    }

    @keyframes blob-animation {
      0% {
        transform: scale(1) translate(0, 0);
      }
      33% {
        transform: scale(1.2) translate(40px, -60px);
      }
      66% {
        transform: scale(0.9) translate(-30px, 50px);
      }
      100% {
        transform: scale(1) translate(0, 0);
      }
    }
    
    .modal {
        display: block;
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1050;
    }
    
    .modal-dialog {
        position: relative;
        margin: 1.75rem auto;
        pointer-events: none;
    }

    @media (min-width: 576px) {
        .modal-dialog {
            max-width: 500px;
            margin: 1.75rem auto;
        }
    }

    .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        outline: 0;
    }

    .modal-header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(.3rem - 1px);
        border-top-right-radius: calc(.3rem - 1px);
    }

    .modal-title {
        margin-bottom: 0;
        line-height: 1.5;
    }

    .btn-close {
        box-sizing: content-box;
        width: 1em;
        height: 1em;
        padding: .25em .25em;
        color: #000;
        background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
        border: 0;
        border-radius: .25rem;
        opacity: .5;
    }

    .modal-body {
        position: relative;
        flex: 1 1 auto;
        padding: 1rem;
    }
  `}</style>
);