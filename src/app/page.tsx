'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParticleField } from '@/components/animations/ParticleField';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';
import { ProcessFlow } from '@/components/illustrations/ProcessFlow';
import { 
  Play, 
  Lightbulb, 
  FileText, 
  Video, 
  Mic, 
  Send,
  Clock,
  Zap,
  Palette,
  DollarSign,
  RotateCcw,
  ArrowRight,
  Mail,
  Menu,
  X,
  Sparkles,
  Cpu,
  Layers,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(target.tagName === 'BUTTON' || target.closest('button') !== null);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
};

// Enhanced Navigation with 3D effects
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Process', 'Pricing'];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="text-3xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AdVerse.media
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          {/* Desktop Navigation with 3D hover effects */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-6 py-3 text-foreground/70 hover:text-foreground transition-all duration-300 rounded-xl group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -2,
                  rotateX: 10
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10">{item}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassmorphismCard className="m-4 p-6 border-white/10">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </GlassmorphismCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Revolutionary Hero Section with 3D elements
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Pitch black background */}
      <div className="absolute inset-0 bg-black" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Remove floating elements - keep clean */}

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-full text-sm text-purple-300 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Next-Gen AI Video Studio
          </motion.span>
        </motion.div>

        <motion.div style={{ y: y1 }}>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl mb-8 font-extralight leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Create
            </span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Extraordinary
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur-xl"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Videos
            </span>
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Transform extraordinary ideas into cinematic reality with our revolutionary AI-powered creative studio. 
          <span className="text-purple-200"> Dreams become videos in 48 hours.</span>
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <MagneticButton
            size="lg" 
            className="text-lg px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/30 border-0 relative overflow-hidden group"
            strength={30}
          >
            <span className="relative z-10 flex items-center">
              <Cpu className="w-5 h-5 mr-3" />
              Start Creating
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
          
          <MagneticButton
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-5 border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-sm group relative overflow-hidden"
            strength={20}
          >
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-5 h-5 mr-3" fill="currentColor" />
              </motion.div>
              Experience Magic
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
        </motion.div>

        {/* Revolutionary Video Preview */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          style={{ y: y1 }}
        >
          <GlassmorphismCard 
            className="p-8 border-white/20 relative overflow-hidden group cursor-pointer"
            hover3d={true}
            intensity="medium"
          >
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50">
              <HeroIllustration />
              
              {/* Interactive Play Button */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md border border-white/30 group-hover:bg-white/20 transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  
                  {/* Ripple effect */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Revolutionary Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$299',
      period: 'per project',
      description: 'Perfect for individual creators, small projects',
      features: [
        'Up to 60 seconds video',
        'HD (1080p) resolution',
        'Basic AI features',
        '2 revisions included',
        '48-hour delivery',
        'Email support'
      ],
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
      popular: false
    },
    {
      name: 'Professional',
      price: '$699',
      period: 'per project',
      description: 'Ideal for businesses and marketing teams',
      features: [
        'Up to 3 minutes video',
        '4K resolution',
        'Advanced AI features',
        'Unlimited revisions',
        '24-hour delivery',
        'Priority support'
      ],
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-violet-500',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited length videos',
        '8K resolution',
        'Full AI creative suite',
        'Unlimited revisions',
        'Same-day delivery',
        'Dedicated manager'
      ],
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-pink-950/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.8 }}
            >
              Choose Your Plan
            </motion.h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              From individual creators to enterprise teams, we have the perfect plan for your video creation needs
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal 
              key={plan.name}
              animation="fadeUp"
              delay={index * 0.2}
            >
              <motion.div
                className="group relative"
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <GlassmorphismCard 
                  className={`h-full p-8 border-white/20 group-hover:border-white/40 relative overflow-hidden ${
                    plan.popular ? 'ring-2 ring-purple-500/30' : ''
                  }`}
                  hover3d={true}
                  intensity="medium"
                >
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                  )}
                  
                  <CardContent className="p-0 relative z-10">
                    <div className="text-center mb-8">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${plan.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 8 }}
                      >
                        <div className="w-full h-full bg-background rounded-3xl flex items-center justify-center">
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                      
                      <h3 className="text-2xl mb-2 text-white">{plan.name}</h3>
                      <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                          <span className="text-foreground/50 text-sm">{plan.period}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className="flex items-center text-foreground/80 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                            style={{ backgroundColor: plan.color }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, delay: featureIndex * 0.2, repeat: Infinity }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <MagneticButton
                      className={`w-full bg-gradient-to-r ${plan.gradient} hover:scale-105 transition-all duration-300 shadow-lg text-white border-0 ${
                        plan.popular ? 'shadow-purple-500/30' : ''
                      }`}
                      strength={15}
                    >
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </MagneticButton>
                  </CardContent>
                </GlassmorphismCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust indicators */}
        <ScrollReveal animation="fadeUp" delay={0.6}>
          <div className="text-center mt-16">
            <p className="text-foreground/60 mb-6">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-foreground/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                30-day money-back guarantee
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Commercial license included
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Revolutionary Process Section
const ProcessSection = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Concept',
      description: 'Transform your wildest visions into creative strategies',
      color: '#f59e0b'
    },
    {
      icon: FileText,
      title: 'Scripting',
      description: 'Craft compelling narratives with AI-enhanced storytelling',
      color: '#10b981'
    },
    {
      icon: Video,
      title: 'AI Generation',
      description: 'Create impossible visuals using AI engines',
      color: '#8b5cf6'
    },
    {
      icon: Mic,
      title: 'Audio Magic',
      description: 'Layer professional soundscapes and voice synthesis',
      color: '#ec4899'
    },
    {
      icon: Send,
      title: 'Delivery',
      description: 'Receive your masterpiece in stunning 4K quality',
      color: '#06b6d4'
    }
  ];

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.8 }}
            >
              The Creation Process
            </motion.h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Watch as your extraordinary ideas transform through our revolutionary AI pipeline
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Process Flow */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="mb-20">
            <ProcessFlow />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal 
                key={step.title}
                animation="fadeUp"
                delay={index * 0.15}
              >
                <motion.div
                  className="group"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <GlassmorphismCard 
                    className="h-full p-8 border-white/10 group-hover:border-white/30 relative overflow-hidden"
                    hover3d={true}
                    intensity="medium"
                  >
                    <CardContent className="p-0 text-center relative z-10">
                      <motion.div 
                        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                        style={{ 
                          background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
                          boxShadow: `0 20px 40px ${step.color}30`
                        }}
                        whileHover={{ 
                          rotate: 8, 
                          scale: 1.1,
                          y: -4 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-10 h-10 text-white relative z-10" />
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-30"
                          style={{ backgroundColor: step.color }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Orbital rings */}
                        <motion.div
                          className="absolute inset-0 border-2 rounded-3xl opacity-30"
                          style={{ borderColor: step.color }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      
                      <h3 className="text-xl mb-4 group-hover:text-purple-300 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </GlassmorphismCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'AI Video Creation', href: '#' },
      { name: 'Template Library', href: '#' },
      { name: 'Custom Branding', href: '#' },
      { name: 'API Access', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Community', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-pink-950/30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <ScrollReveal animation="fadeUp">
                <motion.div 
                  className="text-3xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  AdVerse.media
                </motion.div>
                <p className="text-foreground/70 mb-8 leading-relaxed max-w-md">
                  Revolutionizing video creation with AI-powered creativity. Transform extraordinary ideas into cinematic reality.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center text-foreground/60 hover:text-white hover:border-purple-400/50 transition-all duration-300 group"
                        whileHover={{ y: -4, scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      </motion.a>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                  <ScrollReveal 
                    key={category}
                    animation="fadeUp"
                    delay={categoryIndex * 0.1}
                  >
                    <div>
                      <h3 className="text-white mb-6">{category}</h3>
                      <ul className="space-y-4">
                        {links.map((link, linkIndex) => (
                          <motion.li 
                            key={link.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: linkIndex * 0.1 }}
                          >
                            <motion.a
                              href={link.href}
                              className="text-foreground/60 hover:text-white transition-colors duration-200 flex items-center group"
                              whileHover={{ x: 4 }}
                            >
                              {link.name}
                              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                            </motion.a>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <ScrollReveal animation="fadeUp">
          <div className="py-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-foreground/50">
                <span>© 2024 AdVerse.media. All rights reserved.</span>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-foreground/50">
                <motion.a 
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Status Page
                </motion.a>
                <motion.a 
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Security
                </motion.a>
                <motion.a 
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Changelog
                </motion.a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

// Main App Component
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1 
            className="text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AdVerse.media
          </motion.h1>
          <p className="text-foreground/60 mt-2">Initializing AI Creative Studio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <ProcessSection />
      <PricingSection />
      <Footer />
    </div>
  );
}


