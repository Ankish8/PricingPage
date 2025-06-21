# MATCH Platform - SaaS Business Model & Context

## Project Overview
MATCH is a career development platform with a freemium-to-premium conversion strategy. The platform offers job applications, courses, assessments, and mentorship services.

## Business Model

### Pricing Structure
- **Monthly**: ₹2,000/month (₹24,000 annually)
- **Half-yearly**: ₹20,000 (₹4,000 savings)
- **Annual**: ₹15,000 (₹9,000 savings)
- **Actual Premium Value**: ₹24,000
- **Money-back Guarantee**: 7 days

### User Types
1. **Freemium Users**: Limited access with upgrade prompts
2. **Premium Users**: Full access with premium badges
3. **NCET Plus Users**: Can upgrade to premium at reduced cost

## Feature Access Matrix

### Career Gateway
| Feature | Freemium | Premium |
|---------|----------|---------|
| Profile Building | Basic only | Full access + video resume + AI |
| Hackathons | Full access | Full access |
| Corporate Visibility | Not visible | Premium badge visible to corporates |
| Job Applications | 1 per category | Unlimited + priority recommendations |

### Assessments
| Feature | Freemium | Premium |
|---------|----------|---------|
| NCET Test | 1 attempt/year | 5 attempts |
| Career Assessment | 2 basic tests | Full access to all tests |

### Upskill Hub
| Feature | Freemium | Premium |
|---------|----------|---------|
| NCET Plus | Subscribe separately | Full access + live/recorded sessions |
| Career Roadmap | 20% basic path | Full AI-generated roadmap |
| Courses | 20% preview, no certificates | Full access + certificates |

### Code Playground
| Feature | Freemium | Premium |
|---------|----------|---------|
| Sandbox | 5 instances | Unlimited |
| Capstone Projects | 1 project, no AI | 3 projects with AI assistance |
| Mentor Support | Disabled | Weekly video/audio calls |

## Conversion Strategy

### Entry Points
- Dashboard banner/modal highlighting upgrade
- Feature limitation triggers with CTAs
- Dedicated "Go Premium" button across platform
- Welcome dialog after onboarding

### Psychology Implementation
- **Peak-end Rule**: Most valuable benefit (mentor support) shown last
- **Endowment Effect**: "Your personalized career roadmap" language
- **Loss Aversion**: Show missed opportunities for freemium users
- **Social Proof**: Premium badges for corporate visibility

## Critical Business Rules

### Access Control
- **Course Access**: Lose access upon premium expiry, can regain by renewal
- **Mid-Course Expiry**: Access blocked immediately on plan expiration
- **Free Modules**: Remain accessible after premium expiry
- **Completed Content**: Lost access unless plan renewed

### Payment Handling
- **Failed Payments**: Push premium plan rather than refund
- **Existing Purchases**: No charge if previous purchases exceed premium cost
- **NCET Plus Users**: Reduced upgrade pricing
- **Account Sharing**: One device/session enforcement

### Reminder System
- **Renewal Reminders**: Start from 10th month
- **Extension Timing**: New plan starts after current expiry (no overlap)
- **Post-Expiry**: New plan active from payment date

## Development Notes

### UI/UX Requirements
- Use lock icons, tooltips for premium-only features
- Highlight premium users with badges
- Premium replaces NCET Plus logos on upgrade
- Unified Premium Plan page for benefits/pricing

### Technical Considerations
- Free modules need to be implemented within courses
- Push functionality for premium plan activation
- Session management for account sharing prevention
- Payment failure handling with plan activation

## Edge Cases Handled

1. **Course Mid-Progress**: Access blocked on expiry
2. **Extension Timing**: Plans don't overlap
3. **Payment Glitches**: Push plan instead of refund
4. **Account Sharing**: One device limitation
5. **Mixed Course Content**: 20% free spans all sections
6. **NCET Plus Duration**: Minimum 3 months required

## Current Implementation Status
- Pricing page with animated savings
- Psychology-based feature ordering
- Endowment effect messaging
- Money-back guarantee prominent display