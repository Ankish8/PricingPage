import React, { useState, useEffect, useRef } from 'react';
import { ShimmerButton } from './src/components/magicui/shimmer-button';
import { MagicCard } from './src/components/magicui/magic-card';
import { ShineBorder } from './src/components/magicui/shine-border';
import { NumberTicker } from './src/components/magicui/number-ticker';
import { AuroraText } from './src/components/magicui/aurora-text';
import { RainbowButton } from './src/components/magicui/rainbow-button';
import { InteractiveGridPattern } from './src/components/magicui/interactive-grid-pattern';
import { GridPattern } from './src/components/magicui/grid-pattern';
import Marquee from './src/components/magicui/marquee';
import FAQAccordion from './src/components/magicui/faq-accordion';

// MagicUI Pointer Component
const Pointer = ({ children, content, side = 'top' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          cursor: 'help',
          display: 'inline-block',
          transition: 'all 0.2s ease'
        }}
      >
        {children}
      </div>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            transform: 'translateX(-50%) translateY(-100%)',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.875rem',
              lineHeight: '1.4',
              maxWidth: '320px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animation: 'tooltipFadeIn 0.2s ease-out'
            }}
          >
            {content}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #1a1a2e'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

// Feature Row Component with MagicUI Tooltips
const FeatureRow = ({ 
  icon, 
  title, 
  description, 
  freemiumIcon, 
  freemiumText, 
  premiumIcon, 
  premiumText, 
  freemiumColor = '#FFC107', 
  premiumColor = '#7A2187',
  strategicRationale
}) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '2rem',
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #f1f3f4',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    position: 'relative'
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#fafbfc'}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
  >
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
        {strategicRationale ? (
          <Pointer content={strategicRationale}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#202124', 
              margin: 0,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#7A2187'}
            onMouseLeave={(e) => e.target.style.color = '#202124'}
            >
              <i className={`fas fa-${icon}`} style={{ color: '#7A2187', marginRight: '0.5rem', fontSize: '0.875rem' }}></i>
              {title}
            </h4>
          </Pointer>
        ) : (
          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#202124', margin: 0 }}>
            <i className={`fas fa-${icon}`} style={{ color: '#7A2187', marginRight: '0.5rem', fontSize: '0.875rem' }}></i>
            {title}
          </h4>
        )}
      </div>
      <p style={{ fontSize: '0.875rem', color: '#5F6368', margin: 0, lineHeight: '1.4' }}>
        {description}
      </p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <i className={`fas fa-${freemiumIcon}`} style={{ color: freemiumColor, fontSize: '1.125rem' }}></i>
        <p style={{ fontSize: '0.875rem', color: '#5F6368', margin: 0 }}>{freemiumText}</p>
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <i className={`fas fa-${premiumIcon}`} style={{ color: premiumColor, fontSize: '1.125rem' }}></i>
        <p style={{ fontSize: '0.875rem', color: '#202124', margin: 0, fontWeight: '500' }}>
          {premiumText}
        </p>
      </div>
    </div>
  </div>
);

// Custom hook for animated numbers
const useAnimatedNumber = (initialValue, duration = 700) => {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const animationRef = useRef(null);

  const animateTo = (targetValue) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startValue = displayValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (targetValue - startValue) * easeOut;
      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return [displayValue, animateTo];
};

const PricingPage = () => {
  const [selectedCycle, setSelectedCycle] = useState('annual');
  
  const priceData = {
    monthly: { price: '₹2,000', period: '/month', savings: 0 },
    halfyearly: { price: '₹20,000', period: '/6 months', savings: 4000 },
    annual: { price: '₹15,000', period: '/year', savings: 9000 }
  };

  // Use animated number hook for savings
  const [animatedSavings, animateSavings] = useAnimatedNumber(priceData[selectedCycle].savings);
  
  // Format the display savings
  const displaySavings = animatedSavings > 0 ? `₹${animatedSavings.toLocaleString('en-IN')} savings` : '';

  // Handle cycle change with animation
  const handleCycleChange = (newCycle) => {
    const newSavings = priceData[newCycle].savings;
    animateSavings(newSavings);
    setSelectedCycle(newCycle);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Inject CSS Variables and Styles */}
      <style>
        {`
          body {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            min-height: 100vh;
          }
          
          :root {
            /* Primary Colors */
            --primary: #7A2187;
            --primary-light: #9B4AA3;
            --primary-dark: #5A1865;
            --primary-lighter: #E8D5EA;
            
            /* Neutral Colors */
            --white: #FFFFFF;
            --gray-50: #F8F9FA;
            --gray-100: #F1F3F4;
            --gray-200: #E8EAED;
            --gray-300: #DADCE0;
            --gray-400: #BDC1C6;
            --gray-500: #9AA0A6;
            --gray-600: #80868B;
            --gray-700: #5F6368;
            --gray-800: #3C4043;
            --gray-900: #202124;
            
            /* Semantic Colors */
            --success: #28A745;
            --warning: #FFC107;
            --error: #DC3545;
            --info: #17A2B8;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          .badge-dot {
            animation: pulse 2s infinite;
          }
          
          @keyframes urgency-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
            50% { transform: scale(1.02); box-shadow: 0 0 0 4px rgba(255, 107, 107, 0); }
          }

          @keyframes tooltipFadeIn {
            0% { opacity: 0; transform: translateY(10px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @media (max-width: 768px) {
            .transformation-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }

          .pricing-section {
            background: var(--white);
            padding: 6rem 0;
            position: relative;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .pricing-header {
            text-align: center;
            margin-bottom: 4rem;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 800;
            color: var(--gray-900);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
            line-height: 1.1;
          }

          .section-subtitle {
            font-size: 1.125rem;
            color: var(--gray-600);
            margin-bottom: 3rem;
            line-height: 1.5;
            font-weight: 400;
          }

          /* Pricing Cards */
          .pricing-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }

          .pricing-card {
            background: var(--white);
            border: 2px solid var(--gray-200);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .pricing-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .freemium-card {
            border-color: var(--gray-300);
          }

          .premium-card {
            border-color: var(--primary);
            background: linear-gradient(135deg, rgba(122, 33, 135, 0.02) 0%, var(--white) 100%);
          }

          .premium-card.featured {
            transform: scale(1.05);
            box-shadow: 0 12px 40px rgba(122, 33, 135, 0.15);
          }

          .premium-card.featured:hover {
            transform: scale(1.05) translateY(-8px);
          }

          .popular-badge {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: var(--white);
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            font-size: 0.875rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 12px rgba(122, 33, 135, 0.3);
          }

          .card-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--gray-200);
          }

          .plan-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gray-900);
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
          }

          .price-container {
            display: flex;
            align-items: baseline;
            justify-content: center;
            margin-bottom: 0.5rem;
          }

          .price {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            line-height: 1;
          }

          .period {
            font-size: 1rem;
            color: var(--gray-600);
            margin-left: 0.5rem;
          }

          .price-note {
            font-size: 0.875rem;
            color: var(--success);
            font-weight: 600;
            background: rgba(40, 167, 69, 0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            display: inline-block;
            margin-bottom: 1rem;
          }

          .plan-description {
            color: var(--gray-600);
            font-size: 1rem;
          }

          .features-list {
            margin-bottom: 2rem;
          }

          .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 0;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .feature-item.limited {
            opacity: 0.6;
          }

          .feature-icon {
            color: var(--primary);
            font-size: 0.875rem;
            margin-top: 0.125rem;
            flex-shrink: 0;
          }

          .feature-item.limited .feature-icon {
            color: var(--gray-400);
          }

          .cta-button {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: none;
          }

          .cta-button.primary {
            background: var(--primary);
            color: var(--white);
          }

          .cta-button.primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(122, 33, 135, 0.3);
          }

          .cta-button.secondary {
            background: transparent;
            color: var(--gray-500);
            border: 2px solid var(--gray-300);
            cursor: default;
          }

          .trial-note {
            text-align: center;
            margin-top: 1rem;
            font-size: 0.875rem;
            color: var(--gray-600);
          }
        `}
      </style>

      {/* Header Section */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%)',
          padding: '3rem 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Gradient Blobs */}
        <div 
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-450px',
            width: '600px',
            height: '600px',
            borderRadius: '600px',
            background: 'linear-gradient(180deg, rgba(242, 47, 176, 0.4) 0%, rgba(245, 138, 37, 0.00) 100%, rgba(112, 97, 163, 0.5) 100%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 1
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-450px',
            width: '600px',
            height: '600px',
            borderRadius: '600px',
            background: 'linear-gradient(180deg, rgba(33, 135, 167, 0.3) 0%, rgba(122, 33, 135, 0.2) 60%, rgba(247, 179, 43, 0.00) 100%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 1
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="pricing-header">
            {/* Launch Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(122, 33, 135, 0.1)',
                border: '1px solid rgba(122, 33, 135, 0.2)',
                color: '#7A2187',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                className="badge-dot"
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#7A2187',
                  borderRadius: '50%'
                }}
              />
              <span>Now Launching Premium Subscriptions</span>
            </div>
            
            <h2 className="section-title">Choose Your <AuroraText>Premium</AuroraText> Plan</h2>
            <p className="section-subtitle">
              <strong style={{ color: '#7A2187', fontWeight: '700' }}>94% never reach their potential</strong> because they lack the right tools.
            </p>
            
            {/* Billing Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  display: 'flex',
                  gap: '0.5rem',
                  width: 'fit-content'
                }}
              >
                {['monthly', 'halfyearly', 'annual'].map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => handleCycleChange(cycle)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      margin: '0 0.125rem',
                      color: selectedCycle === cycle ? '#FFFFFF' : '#80868B',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {cycle === 'monthly' ? 'Monthly' : cycle === 'halfyearly' ? '6 Months' : 'Annual'}
                  </button>
                ))}
                {/* Selector Indicator */}
                <div 
                  style={{
                    position: 'absolute',
                    background: '#7A2187',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    top: '0.5rem',
                    left: '0.5rem',
                    width: 'calc(33.333% - 0.333rem)',
                    height: 'calc(100% - 1rem)',
                    zIndex: 1,
                    transform: selectedCycle === 'monthly' ? 'translateX(0%)' : 
                               selectedCycle === 'halfyearly' ? 'translateX(100%)' : 
                               'translateX(200%)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards">
            {/* Freemium Card */}
            <div className="pricing-card freemium-card">
              <div className="card-header">
                <h3 className="plan-name">Freemium</h3>
                <div className="price-container">
                  <span className="price">₹0</span>
                  <span className="period">/forever</span>
                </div>
                <p className="plan-description">Perfect to get started</p>
              </div>
              
              <div className="features-list">
                <div className="feature-item">
                  <i className="fas fa-lock feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>1 job application per category</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-lock feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>1 NCET test attempt/year</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-lock feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>5 sandbox instances</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-lock feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>Limited course access (20%)</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-minus-circle feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>No NCET Plus program access</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-minus-circle feature-icon" style={{ color: '#9AA0A6' }}></i>
                  <span>No certificates</span>
                </div>
              </div>
              
              <button 
                className="cta-button secondary"
                style={{ 
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.95rem',
                  height: 'auto'
                }}
              >
                Current Plan
              </button>
            </div>

            {/* Premium Card */}
            <div className="pricing-card premium-card featured">
              
              <div className="popular-badge">
                <i className="fas fa-star"></i>
                <span>Most Popular</span>
              </div>
              
              <div className="card-header">
                <h3 className="plan-name">Premium</h3>
                <div className="price-container">
                  <span className="price">{priceData[selectedCycle].price}</span>
                  <span className="period">{priceData[selectedCycle].period}</span>
                </div>
                {displaySavings && (
                  <div className="price-note">{displaySavings}</div>
                )}
                <p className="plan-description">Everything you need to excel</p>
              </div>
              
              <div className="features-list">
                <div className="feature-item">
                  <i className="fas fa-door-open feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong style={{ fontWeight: '700' }}>Unlimited</strong> job applications</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-star feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong style={{ fontWeight: '700' }}>Premium badge</strong> & corporate visibility</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-award feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong style={{ fontWeight: '700' }}>Full course access</strong> + certificates</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-gem feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong style={{ fontWeight: '700' }}>NCET Plus program</strong> access</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-video feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong style={{ fontWeight: '700' }}>Live mentor support</strong></span>
                </div>
              </div>
              
              <RainbowButton 
                className="w-full text-lg font-semibold"
                style={{ 
                  padding: '1rem 2rem', 
                  borderRadius: '12px',
                  background: '#7A2187',
                  color: 'white'
                }}
              >
                Start Your Journey
              </RainbowButton>
              <div className="trial-note" style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#28A745', fontSize: '0.875rem' }}></i>
                  <span>7-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        padding: '6rem 0 0 0',
        position: 'relative' 
      }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#202124',
              marginBottom: '1rem'
            }}>
              Compare Plans in Detail
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#5F6368',
              marginBottom: '3rem'
            }}>
              See exactly what you get with Premium across all platform features
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Table Header */}
      <div style={{
        position: 'sticky',
        top: '0',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        zIndex: 10,
        padding: '1rem 0',
        borderBottom: '1px solid #e8eaed'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
          alignItems: 'center',
          padding: '0 1rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#5F6368', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Features
            </h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#5F6368', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Freemium
            </h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#7A2187', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Premium
            </h4>
          </div>
        </div>
      </div>

      {/* Feature Categories Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        padding: '0 0 6rem 0'
      }}>
        <div className="container">
          {/* Feature Categories */}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Core Value Propositions */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                position: 'sticky',
                top: '57px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                zIndex: 9,
                padding: '1rem 1rem',
                borderBottom: '2px solid #7A2187',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#202124',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: 0
                }}>
                  <i className="fas fa-bullseye" style={{ color: '#7A2187', fontSize: '1.125rem' }}></i>
                  Core Career Benefits
                </h3>
              </div>
              
              <FeatureRow 
                icon="door-open"
                title="Job Applications"
                description="Apply to career opportunities across all categories"
                freemiumIcon="lock"
                freemiumText="1 per category"
                freemiumColor="#9AA0A6"
                premiumIcon="infinity"
                premiumText="Unlimited + Priority Matching"
                strategicRationale="Miss 94% of job matches. Premium users get 12x more relevant opportunities."
              />

              <FeatureRow 
                icon="eye"
                title="Corporate Visibility"
                description="Enhanced visibility to potential employers"
                freemiumIcon="eye-slash"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="star"
                premiumText="Premium Badge + Recruiter Pool"
                strategicRationale="Invisible to premium recruiters. 85% of top jobs go to premium pool candidates only."
              />

              <FeatureRow 
                icon="user-graduate"
                title="Expert Career Counseling"
                description="Personalized guidance from industry professionals"
                freemiumIcon="minus-circle"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="video"
                premiumText="Weekly 1-on-1 Calls"
                strategicRationale="No expert guidance = 67% longer career transition time. Premium users land jobs 3x faster."
              />
            </div>

            {/* Learning & Development */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                position: 'sticky',
                top: '57px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                zIndex: 9,
                padding: '1rem 1rem',
                borderBottom: '2px solid #7A2187',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#202124',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: 0
                }}>
                  <i className="fas fa-brain" style={{ color: '#7A2187', fontSize: '1.125rem' }}></i>
                  Learning & Development
                </h3>
              </div>
              
              <FeatureRow 
                icon="award"
                title="Courses & Certification"
                description="Access to skill development courses and certificates"
                freemiumIcon="lock"
                freemiumText="20% Access, No Certificates"
                freemiumColor="#9AA0A6"
                premiumIcon="certificate"
                premiumText="Full Access + Certificates"
                strategicRationale="No certificate = no credential value. Employers reject 91% of uncertified skill claims."
              />

              <FeatureRow 
                icon="map-marked-alt"
                title="AI Career Roadmap"
                description="Personalized AI-powered career guidance"
                freemiumIcon="lock"
                freemiumText="Basic Insights (20%)"
                freemiumColor="#9AA0A6"
                premiumIcon="brain"
                premiumText="Complete AI Roadmap"
                strategicRationale="80% of your roadmap hidden = career detours. Complete roadmap users reach goals 4x faster."
              />

              <FeatureRow 
                icon="user-tie"
                title="Live Mentor Support"
                description="Expert guidance for project development"
                freemiumIcon="ban"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="video"
                premiumText="Weekly Video Calls"
                strategicRationale="No mentor = project failure risk. 82% of successful projects had mentor guidance."
              />
            </div>

            {/* Skill Assessment & Practice */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                position: 'sticky',
                top: '57px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                zIndex: 9,
                padding: '1rem 1rem',
                borderBottom: '2px solid #7A2187',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#202124',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: 0
                }}>
                  <i className="fas fa-clipboard-check" style={{ color: '#7A2187', fontSize: '1.125rem' }}></i>
                  Skill Assessment & Practice
                </h3>
              </div>
              
              <FeatureRow 
                icon="graduation-cap"
                title="NCET Test Attempts"
                description="National Career Enhancement Test attempts"
                freemiumIcon="exclamation-triangle"
                freemiumText="1 Attempt/Year"
                premiumIcon="chart-bar"
                premiumText="5 Attempts + Analytics"
                strategicRationale="One chance = one mistake ends your year. Premium users improve scores by 23% on retakes."
              />

              <FeatureRow 
                icon="project-diagram"
                title="Capstone Projects"
                description="Real-world project development with AI assistance"
                freemiumIcon="exclamation-triangle"
                freemiumText="1 Project, No AI"
                premiumIcon="robot"
                premiumText="3 Projects + AI Support"
                strategicRationale="Solo projects = slower development. AI support reduces project time by 65%."
              />

              <FeatureRow 
                icon="desktop"
                title="Coding Sandbox"
                description="Advanced coding environments for practice"
                freemiumIcon="exclamation-triangle"
                freemiumText="5 Instances"
                premiumIcon="infinity"
                premiumText="Unlimited Access"
                strategicRationale="Limited practice = limited skills. 5 instances filled in 2 days by active coders."
              />

              <FeatureRow 
                icon="chart-line"
                title="Career Assessments"
                description="Personality and skill assessment tests"
                freemiumIcon="exclamation-triangle"
                freemiumText="2 Tests Only"
                premiumIcon="infinity"
                premiumText="Unlimited + Analytics"
                strategicRationale="Incomplete career profile = wrong path. 89% find their ideal role only after 3+ assessments."
              />
            </div>

            {/* Exclusive Programs & Benefits */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                position: 'sticky',
                top: '57px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                zIndex: 9,
                padding: '1rem 1rem',
                borderBottom: '2px solid #7A2187',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#202124',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: 0
                }}>
                  <i className="fas fa-crown" style={{ color: '#7A2187', fontSize: '1.125rem' }}></i>
                  Exclusive Programs & Benefits
                </h3>
              </div>
              
              <FeatureRow 
                icon="plus-circle"
                title="NCET Plus Programs"
                description="Advanced career enhancement programs"
                freemiumIcon="ban"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="video"
                premiumText="Full Program + Live Training"
                strategicRationale="Miss live training = miss networking. 78% of premium program graduates get job offers."
              />

              <FeatureRow 
                icon="rocket"
                title="TalentX Platform"
                description="Access to exclusive talent marketplace"
                freemiumIcon="ban"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="unlock"
                premiumText="Full Access"
                strategicRationale="Locked out of exclusive opportunities. TalentX has 93% premium-only job postings."
              />

              <FeatureRow 
                icon="graduation-cap"
                title="WAVE Scholarship"
                description="Exclusive scholarship opportunities for top performers"
                freemiumIcon="ban"
                freemiumText="Not Available"
                freemiumColor="#9AA0A6"
                premiumIcon="money-bill-wave"
                premiumText="₹25,000 Scholarship Chance"
                premiumColor="#28A745"
                strategicRationale="Miss ₹25,000 potential savings. Only 200 premium users eligible per quarter."
              />
            </div>

            {/* Platform Features & Engagement */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                position: 'sticky',
                top: '57px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                zIndex: 9,
                padding: '1rem 1rem',
                borderBottom: '2px solid #7A2187',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '600',
                  color: '#202124',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: 0
                }}>
                  <i className="fas fa-layer-group" style={{ color: '#7A2187', fontSize: '1.125rem' }}></i>
                  Platform Features & Engagement
                </h3>
              </div>
              
              <FeatureRow 
                icon="user-circle"
                title="Profile Building"
                description="Create and customize your professional profile"
                freemiumIcon="exclamation-triangle"
                freemiumText="Basic Profile Only"
                premiumIcon="crown"
                premiumText="Enhanced + Video Resume + AI"
                strategicRationale="Limited profile = limited visibility. Basic profiles get 73% fewer corporate views."
              />

              <FeatureRow 
                icon="chart-line"
                title="Leaderboard Status"
                description="Showcase your achievements and ranking"
                freemiumIcon="user"
                freemiumText="Standard Listing"
                premiumIcon="crown"
                premiumText="Premium Badge Highlighting"
                strategicRationale="Invisible achievements = missed opportunities. Premium highlights get 4x more recruiter attention."
              />

              <FeatureRow 
                icon="trophy"
                title="Reward System"
                description="Earn and redeem points for platform activities"
                freemiumIcon="exclamation-triangle"
                freemiumText="50% Rewards Cap"
                premiumIcon="star"
                premiumText="Unlimited Rewards"
                strategicRationale="Half rewards = half motivation. Premium users earn 2x more valuable benefits."
              />

              <FeatureRow 
                icon="trophy"
                title="Hackathons"
                description="Participate in coding competitions and challenges"
                freemiumIcon="check-circle"
                freemiumText="Full Access"
                freemiumColor="#28A745"
                premiumIcon="check-circle"
                premiumText="Full Access"
                premiumColor="#28A745"
              />

              <FeatureRow 
                icon="shield-alt"
                title="Money Back Guarantee"
                description="Risk-free trial period for new subscribers"
                freemiumIcon="minus"
                freemiumText="-"
                freemiumColor="#9AA0A6"
                premiumIcon="shield-check"
                premiumText="7-Day Risk-Free Trial"
                premiumColor="#28A745"
                strategicRationale="Risk-free commitment. 96% of users continue after experiencing premium benefits."
              />
            </div>

          </div>
        </div>
      </section>

      {/* Transition to Transformation */}
      <section style={{
        background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)',
        padding: '2rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #f1f3f4',
        borderBottom: '1px solid #f1f3f4'
      }}>
        {/* MagicUI Grid Pattern */}
        <GridPattern
          width={80}
          height={80}
          x={-1}
          y={-1}
          className="text-gray-200"
          style={{
            opacity: 0.4,
            zIndex: 1,
            maskImage: 'radial-gradient(600px circle at center, white, transparent)',
            WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)'
          }}
        />
        
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 3
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#202124',
              marginBottom: '0.75rem',
              lineHeight: '1.2'
            }}>
              Stop Reading. Start Transforming.
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#5F6368',
              lineHeight: '1.6',
              margin: '0 0 1.5rem 0'
            }}>
              See the exact difference Premium makes in <strong style={{ color: '#7A2187' }}>real careers</strong>, <strong style={{ color: '#7A2187' }}>real numbers</strong>, <strong style={{ color: '#7A2187' }}>real results</strong>.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <RainbowButton>
                Get Premium Now
              </RainbowButton>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                fontSize: '0.875rem',
                color: '#5F6368',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#FFD700' }} />
                  <span>7-day guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-piggy-bank" style={{ color: '#28A745' }} />
                  <span><strong>₹9,000</strong> savings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Transformation Section */}
      <section style={{
        background: '#ffffff',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: '#7A2187',
              marginBottom: '0.5rem'
            }}>
              Is Your Career Stuck In The Slow Lane?
            </p>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#202124',
              marginBottom: '0.5rem'
            }}>
              Transform Wasted Time Into Career Success
            </h2>
          </div>
          
          <div className="transformation-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* BEFORE Card */}
            <MagicCard
              className="relative overflow-hidden"
              gradientColor="rgba(220, 53, 69, 0.1)"
            >
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                height: '100%'
              }}>
                <div style={{
                  background: 'rgba(220, 53, 69, 0.1)',
                  color: '#DC3545',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  width: 'fit-content'
                }}>
                  BEFORE
                </div>
                
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#202124',
                  marginBottom: '1rem'
                }}>
                  Current Situation
                </h4>
                
                <p style={{
                  fontSize: '0.95rem',
                  color: '#5F6368',
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Struggling to break through career barriers
                </p>
                
                <div>
                  {[
                    'Missing 94% of relevant job opportunities',
                    'No access to NCET Plus program advantages',
                    'Invisible to premium recruiters and employers',
                    'Limited to 1 NCET attempt per year'
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1 + 0.3}s forwards`
                    }}>
                      <i className="fas fa-times" style={{ 
                        color: '#DC3545', 
                        fontSize: '0.875rem' 
                      }} />
                      <p style={{
                        margin: 0,
                        color: '#5F6368',
                        fontSize: '0.875rem'
                      }}>
                        {item.includes('94%') ? (
                          <>
                            Missing <NumberTicker value={94} suffix="% of relevant job opportunities" delay={index * 0.1 + 0.8} />
                          </>
                        ) : item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MagicCard>
            
            {/* AFTER Card */}
            <ShineBorder
              className="relative overflow-hidden rounded-2xl"
              color={["#E8D5EA", "#FFFFFF", "#F8F9FA"]}
              borderWidth={2}
            >
              <MagicCard
                className="relative overflow-hidden"
                gradientColor="rgba(255, 255, 255, 0.1)"
              >
                <div style={{
                  background: 'linear-gradient(135deg, #7A2187 0%, #9B4AA3 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                    width: 'fit-content'
                  }}>
                    AFTER
                  </div>
                  
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1rem'
                  }}>
                    With Premium Access
                  </h4>
                  
                  <p style={{
                    fontSize: '0.95rem',
                    marginBottom: '1.5rem',
                    lineHeight: '1.5',
                    opacity: 0.95
                  }}>
                    Fast-track your career with proven strategies
                  </p>
                  
                  <div>
                    {[
                      'Full NCET Plus program + live training',
                      '5 NCET attempts + advanced analytics',
                      'Access 12x more relevant opportunities',
                      '4x higher recruiter response rates'
                    ].map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1 + 0.8}s forwards`
                      }}>
                        <i className="fas fa-check" style={{ 
                          color: 'white', 
                          fontSize: '0.875rem' 
                        }} />
                        <p style={{
                          margin: 0,
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontSize: '0.875rem'
                        }}>
                          {item.includes('12x') ? (
                            <>
                              Access <NumberTicker value={12} suffix="x more relevant opportunities" delay={index * 0.1 + 1.3} className="text-white font-semibold" />
                            </>
                          ) : item.includes('4x') ? (
                            <>
                              <NumberTicker value={4} suffix="x higher recruiter response rates" delay={index * 0.1 + 1.3} className="text-white font-semibold" />
                            </>
                          ) : item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </ShineBorder>
          </div>
          
          
          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '2rem auto 3rem auto',
            position: 'relative',
            zIndex: 3
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <RainbowButton>
                Get Premium Now
              </RainbowButton>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                fontSize: '0.875rem',
                color: '#5F6368',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#FFD700' }} />
                  <span>7-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bridge */}
      <section style={{
        background: 'white',
        padding: '2.5rem 0',
        borderTop: '1px solid #e8eaed',
        borderBottom: '1px solid #e8eaed'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#5F6368',
              marginBottom: '0.5rem'
            }}>
              Don't just take our word for it.
            </p>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#202124',
              lineHeight: '1.3',
              margin: 0
            }}>
              Here's what happens when talented professionals like you choose Premium
            </h3>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#202124',
              marginBottom: '1rem'
            }}>
              Join 50,000+ Professionals Who Transformed Their Careers
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#5F6368',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              See how premium members are landing dream jobs faster
            </p>
          </div>
          
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '100px',
              background: 'linear-gradient(to right, #f8f9fa, transparent)',
              zIndex: 10
            }} />
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '100px',
              background: 'linear-gradient(to left, #f8f9fa, transparent)',
              zIndex: 10
            }} />
            
            <Marquee pauseOnHover className="[--duration:60s]">
              {[
                {
                  name: "Priya Sharma",
                  role: "Software Engineer at Google",
                  content: "NCET Plus program helped me crack Google's interview. The premium mock tests and mentor guidance were game-changers!",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Rahul Verma",
                  role: "Data Scientist at Microsoft",
                  content: "From 2 job rejections to 5 offers! Premium career roadmap showed me exactly what skills I was missing.",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Anita Desai",
                  role: "Product Manager at Amazon",
                  content: "The unlimited job applications feature helped me apply to 200+ positions. Got my dream PM role in 3 months!",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Vikram Singh",
                  role: "DevOps Engineer at Flipkart",
                  content: "Premium badge made me visible to recruiters I never thought would notice me. 4x more interview calls!",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Sneha Patel",
                  role: "UX Designer at Zomato",
                  content: "Weekly mentor calls with industry experts gave me insider tips that no course teaches. Worth every rupee!",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
                },
                {
                  name: "Arjun Nair",
                  role: "Full Stack Developer at Paytm",
                  content: "5 NCET attempts helped me improve from 60% to 95%. Finally got noticed by top-tier companies!",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                }
              ].map((testimonial, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  margin: '0 1rem',
                  width: '300px',
                  flexShrink: 0,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e8eaed'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginRight: '1rem',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#202124',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {testimonial.name}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#5F6368',
                        margin: 0
                      }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    marginBottom: '0.75rem'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star" style={{ 
                        color: '#FFC107', 
                        fontSize: '0.875rem',
                        marginRight: '0.125rem'
                      }} />
                    ))}
                  </div>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#202124',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Objection Handling Bridge */}
      <section style={{
        background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)',
        padding: '2rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #f1f3f4',
        borderBottom: '1px solid #f1f3f4'
      }}>
        <GridPattern
          width={80}
          height={80}
          x={-1}
          y={-1}
          className="text-gray-200"
          style={{
            opacity: 0.4,
            zIndex: 1,
            maskImage: 'radial-gradient(600px circle at center, white, transparent)',
            WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)'
          }}
        />
        
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 3
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#202124',
              marginBottom: '0.75rem',
              lineHeight: '1.2'
            }}>
              <span style={{ color: '#7A2187' }}>Still Have Questions?</span>
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#5F6368',
              lineHeight: '1.6',
              margin: 0
            }}>
              We've got answers to help you make the right decision about <strong style={{ color: '#7A2187' }}>Premium</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        background: 'white',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#202124',
              marginBottom: '1rem'
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#5F6368',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to know about Premium access
            </p>
          </div>
          
          <FAQAccordion faqs={[
            {
              question: "What happens to my NCET Plus access when I upgrade to Premium?",
              answer: "When you upgrade to Premium, your existing NCET Plus subscription is automatically included at no extra cost. You'll get full access to both live and recorded NCET Plus sessions, plus all the additional Premium benefits like unlimited job applications and weekly mentor calls."
            },
            {
              question: "Can I still access my courses if my Premium subscription expires?",
              answer: "If your Premium subscription expires, you'll lose access to premium courses and certificates. However, any free modules within courses will remain accessible. To regain full access, simply renew your Premium subscription and you'll immediately get back all your previous progress and materials."
            },
            {
              question: "How does the 7-day money-back guarantee work?",
              answer: "We offer a 7-day money-back guarantee from the date of purchase. If you're not completely satisfied with Premium access, contact our support team within 7 days for a full refund. This gives you time to explore all premium features risk-free."
            },
            {
              question: "What's the difference between monthly and annual plans?",
              answer: "The annual plan offers significant savings - you pay ₹15,000 instead of ₹24,000 (₹9,000 savings). The 6-month plan costs ₹20,000, saving you ₹4,000. All plans include the same premium features, but longer commitments offer better value."
            },
            {
              question: "How many NCET attempts do I get with Premium?",
              answer: "Premium members get 5 NCET attempts per year compared to just 1 attempt for free users. This gives you multiple opportunities to improve your score and showcase your best performance to potential employers."
            },
            {
              question: "Will recruiters really notice my Premium badge?",
              answer: "Yes! Our Premium badge makes you visible in the exclusive recruiter pool where 85% of top-tier positions are filled. Premium members report 4x higher recruiter response rates and get priority consideration for quality opportunities."
            },
            {
              question: "Can I upgrade from NCET Plus to Premium mid-subscription?",
              answer: "Absolutely! If you're currently subscribed to NCET Plus, you can upgrade to Premium at a reduced cost. We'll calculate the remaining value of your NCET Plus subscription and apply it toward your Premium upgrade."
            },
            {
              question: "What if I need help during my Premium subscription?",
              answer: "Premium members get priority support through multiple channels. You'll have access to weekly video/audio calls with industry mentors, priority customer support, and exclusive Premium member resources to ensure you get maximum value from your subscription."
            }
          ]} />
          
          {/* Final Conversion CTA */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              padding: '4rem 2rem',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Interactive Grid Pattern */}
              <InteractiveGridPattern
                width={40}
                height={40}
                squares={[20, 12]}
                className="opacity-10"
                squaresClassName="hover:fill-white/20 hover:stroke-white/30 transition-all duration-200"
                style={{
                  zIndex: 1
                }}
              />
              
              <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <AuroraText 
                  className="text-4xl font-bold mb-6"
                  colors={["#7A2187", "#9B4AA3", "#5A1865", "#7A2187"]}
                  speed={2}
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    display: 'block'
                  }}
                >
                  Your Career Can't Wait Any Longer
                </AuroraText>
                
                <p style={{
                  fontSize: '1.25rem',
                  color: '#5F6368',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  While you're thinking about it, your competition is already getting ahead with Premium.
                </p>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#202124',
                  fontWeight: '600',
                  marginBottom: '2.5rem'
                }}>
                  Don't let another opportunity slip by.
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <RainbowButton 
                    style={{ 
                      fontSize: '1.2rem',
                      padding: '1.25rem 3rem',
                      fontWeight: '600'
                    }}
                  >
                    Claim Your Premium Access
                  </RainbowButton>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  fontSize: '0.9rem',
                  color: '#5F6368',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#28A745',
                      animation: 'pulse 2s infinite'
                    }} />
                    <span><NumberTicker value={847} /> users upgraded this week</span>
                  </div>
                  <span>•</span>
                  <span><strong>₹9,000</strong> savings</span>
                  <span>•</span>
                  <span><strong>7-day</strong> guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;