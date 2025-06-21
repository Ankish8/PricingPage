"use client";
import React, { useState } from 'react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            background: 'white',
            borderRadius: '16px',
            marginBottom: '1rem',
            border: openIndex === index 
              ? '1px solid rgba(122, 33, 135, 0.2)' 
              : '1px solid #e8eaed',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: openIndex === index 
              ? '0 8px 32px rgba(122, 33, 135, 0.08)' 
              : '0 2px 8px rgba(0, 0, 0, 0.04)',
            transform: openIndex === index ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: '100%',
              padding: '1.5rem 2rem',
              background: 'transparent',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
          >
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#202124',
              margin: 0,
              lineHeight: '1.4'
            }}>
              {faq.question}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: openIndex === index ? '#7A2187' : '#f1f3f4',
              transition: 'all 0.3s ease',
              transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              <i 
                className="fas fa-chevron-down" 
                style={{ 
                  color: openIndex === index ? 'white' : '#5F6368',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease'
                }} 
              />
            </div>
          </button>
          
          <div style={{
            maxHeight: openIndex === index ? '500px' : '0',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              padding: '0 2rem 1.5rem 2rem',
              borderTop: '1px solid #f1f3f4'
            }}>
              <p style={{
                fontSize: '1rem',
                color: '#5F6368',
                lineHeight: '1.6',
                margin: '1rem 0 0 0'
              }} dangerouslySetInnerHTML={{
                __html: faq.answer
                  .replace(/₹[\d,]+/g, '<strong style="color: #7A2187;">$&</strong>')
                  .replace(/\d+%/g, '<strong style="color: #28A745;">$&</strong>')
                  .replace(/\d+x/g, '<strong style="color: #28A745;">$&</strong>')
                  .replace(/\d+ (days?|attempts?|years?)/g, '<strong>$&</strong>')
              }}>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;