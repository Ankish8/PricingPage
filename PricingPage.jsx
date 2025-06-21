import React, { useState, useEffect, useRef } from 'react';

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
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .badge-dot {
            animation: pulse 2s infinite;
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
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--gray-900);
            margin-bottom: 1rem;
          }

          .section-subtitle {
            font-size: 1.125rem;
            color: var(--gray-600);
            margin-bottom: 3rem;
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
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: 1rem;
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
            
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">
              Get unlimited access to premium features, priority visibility,<br/>
              and AI-powered career guidance. Simple pricing, transparent value.
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
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: '8px',
                      fontWeight: '600',
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
                  <i className="fas fa-exclamation-triangle feature-icon" style={{ color: '#FFC107' }}></i>
                  <span>1 job application per category</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-exclamation-triangle feature-icon" style={{ color: '#FFC107' }}></i>
                  <span>1 NCET test attempt/year</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-exclamation-triangle feature-icon" style={{ color: '#FFC107' }}></i>
                  <span>5 sandbox instances</span>
                </div>
                <div className="feature-item limited">
                  <i className="fas fa-lock feature-icon"></i>
                  <span>Limited course access (20%)</span>
                </div>
              </div>
              
              <button className="cta-button secondary">Current Plan</button>
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
                  <i className="fas fa-infinity feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong>Unlimited</strong> job applications</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-crown feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong>Premium badge</strong> & corporate visibility</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-graduation-cap feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong>Full course access</strong> + certificates</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-rocket feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong>NCET Plus program</strong> access</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-user-tie feature-icon" style={{ color: '#7A2187' }}></i>
                  <span><strong>Live mentor support</strong></span>
                </div>
              </div>
              
              <button className="cta-button primary">Start Your Journey</button>
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
    </div>
  );
};

export default PricingPage;