import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Signup = () => {
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
                            Create Account
                        </h2>

                        <form className="space-y-6" method='post' action='http://localhost:3000/'>

                            <div className="relative">
                                <input
                                    ref={el => inputRefs.current[0] = el}
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onFocus={() => handleInputFocus(0)}
                                    onBlur={() => handleInputBlur(0)}
                                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    ref={el => inputRefs.current[1] = el}
                                    type="email"
                                    placeholder="Email address"
                                    name="email"
                                    onFocus={() => handleInputFocus(1)}
                                    onBlur={() => handleInputBlur(1)}
                                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    ref={el => inputRefs.current[2] = el}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onFocus={() => handleInputFocus(2)}
                                    onBlur={() => handleInputBlur(2)}
                                    className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>

                            <button
                                ref={el => inputRefs.current[3] = el}
                                type="submit"
                                className="w-full cursor-pointer py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group"
                            >
                                <span className="group-hover:scale-105  transition-transform duration-300 inline-block">
                                    Sign Up
                                </span>
                            </button>
                        </form>
                        <div className="relative mt-3 mb-3">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <form method="GET" action="http://localhost:3000/auth/google">
                            <button
                                ref={el => inputRefs.current[4] = el}
                                type="submit"
                                onFocus={() => handleInputFocus(4)}
                                onBlur={() => handleInputBlur(4)}
                                className="w-full cursor-pointer py-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-gray-700 font-medium group"
                            >
                                <svg
                                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="group-hover:text-gray-900 transition-colors duration-300">
                                    Sign up with Google
                                </span>
                            </button>
                        </form>


                        <div className="mt-6 text-center">
                            <a href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                Already have an Account? <span className='underline'>Login</span>
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
                        <h3 className="text-2xl font-bold mb-4">Samanyay</h3>
                        <p className="text-blue-100 leading-relaxed">
                            Bridging the Gap to Equitable Justice with AI-Powered Legal Assistance
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup




/* const [userData, setUserData] = useState({
    name: "",
    email: "",
    registrationDate: "2024-01-15",
    plan: "Free", // or "Pro"
    avatar: "",
    totalCases: 0,
    storageUsed: 2.4, // GB
    storageLimit: 5.0 // GB for Free plan
  }) */


    /* useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true
        });

        console.log("API Response:", response.data);

        // Transform API data to match your state structure
        const apiData = response.data;
        const user = apiData.user || apiData;

        setUserData({
          name: user.name || "",
          email: user.email || "",
          registrationDate: "2024-01-15", // You might need to get this from API
          plan: "Free", // You might need to get this from API
          avatar: user.profileImage || "",
          totalCases: user.cases ? user.cases.length : 0,
          storageUsed: 2.4, // You might need to calculate this
          storageLimit: 5.0 // You might need to get this from API
        });


      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please check your connection.");

      }
    };

    fetchUserData();
  }, []); */