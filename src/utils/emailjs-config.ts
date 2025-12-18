/**
 * EmailJS Configuration
 * 
 * Instructions:
 * 1. Go to https://www.emailjs.com/ and create an account
 * 2. Connect your Gmail service (rimaorganiccosmetics@gmail.com)
 * 3. Create an email template for order notifications
 * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
 * 5. Replace the values below with your actual EmailJS credentials
 * 
 * For detailed instructions, see: /EMAILJS_SETUP_GUIDE.md
 */

export const EMAILJS_CONFIG = {
  /**
   * Service ID - Get from: EmailJS Dashboard → Email Services
   * Example: 'service_abc1234'
   */
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  /**
   * Template ID - Get from: EmailJS Dashboard → Email Templates
   * Example: 'template_xyz5678'
   */
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  /**
   * Public Key - Get from: EmailJS Dashboard → Account → API Keys
   * Example: 'AbC1234XyZ'
   */
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  /**
   * Business email where order notifications will be sent
   */
  BUSINESS_EMAIL: 'rimaorganiccosmetics@gmail.com',
};

/**
 * Validates if EmailJS is properly configured
 */
export function isEmailJSConfigured(): boolean {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  );
}

/**
 * Helper function to get configuration warnings
 */
export function getEmailJSConfigWarnings(): string[] {
  const warnings: string[] = [];
  
  if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
    warnings.push('EmailJS Service ID is not configured');
  }
  
  if (EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
    warnings.push('EmailJS Template ID is not configured');
  }
  
  if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    warnings.push('EmailJS Public Key is not configured');
  }
  
  return warnings;
}
