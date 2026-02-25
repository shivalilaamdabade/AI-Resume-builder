"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build a Resume That Gets Read.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create professional resumes with AI-powered suggestions and ATS-friendly formatting.
          </p>
          <Link 
            href="/builder"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1"
          >
            Start Building
          </Link>
        </div>
      </main>
    </div>
  );
}

