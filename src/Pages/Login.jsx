import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Login = () => {
    const containerRef = useRef(null)
    const formRef = useRef(null)
    const logoRef = useRef(null)
    const titleRef = useRef(null)
    const inputRefs = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial state
            gsap.set([formRef.current, logoRef.current], { 
                y: 50, 
                opacity: 0 
            })
            gsap.set(titleRef.current, { 
                y: -30, 
                opacity: 0 
            })
            gsap.set(inputRefs.current, { 
                x: -30, 
                opacity: 0 
            })

            // Animate container
            const tl = gsap.timeline()
            tl.to(containerRef.current, {
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.4")
            .to([formRef.current, logoRef.current], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.3")
            .to(inputRefs.current, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.2")

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleInputFocus = (index) => {
        gsap.to(inputRefs.current[index], {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    const handleInputBlur = (index) => {
        gsap.to(inputRefs.current[index], {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div 
                ref={containerRef}
                className="flex w-full max-w-4xl gap-8 scale-95"
            >
                {/* Form Section */}
                <div 
                    ref={formRef}
                    className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10">
                        <h2 
                            ref={titleRef}
                            className="text-3xl font-bold text-gray-800 mb-8 text-center"
                        >
                            Welcome Back
                        </h2>
                        
                        <form className="space-y-6">
                            <div className="relative">
                                <input 
                                    ref={el => inputRefs.current[0] = el}
                                    type="email" 
                                    placeholder="Email address" 
                                    name="email"
                                    onFocus={() => handleInputFocus(0)}
                                    onBlur={() => handleInputBlur(0)}
                                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>
                            
                            <div className="relative">
                                <input 
                                    ref={el => inputRefs.current[1] = el}
                                    type="password" 
                                    placeholder="Password" 
                                    name="password"
                                    onFocus={() => handleInputFocus(1)}
                                    onBlur={() => handleInputBlur(1)}
                                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>
                            
                            <button 
                                ref={el => inputRefs.current[2] = el}
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Log In
                            </button>
                        </form>

                        <div className="mt-6 text-center space-y-2">
                            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 block">
                                Forgot your password?
                            </a>
                            <a href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                Don't have an account? <span className="underline">Sign Up</span>
                            </a>
                        </div>
                        
                    </div>
                </div>
            
                {/* Logo/Brand Section */}
                <div 
                    ref={logoRef}
                    className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-white relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Your Brand</h3>
                        <p className="text-blue-100 leading-relaxed">
                            Welcome to our platform. Sign in to access your account and continue your journey with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login