/**
 * EmailJS Configuration for Royal Sneakers
 * 
 * IMPORTANT: Your EmailJS Template MUST use these exact variable names:
 * - {{user_name}} - Customer name
 * - {{user_email}} - Customer email
 * - {{order_id}} - Order ID  
 * - {{message}} - Message content
 */

// EmailJS Credentials
const EMAILJS_SERVICE_ID = "service_xcusct8";
const EMAILJS_TEMPLATE_ID = "template_4mxdytl";
const EMAILJS_PUBLIC_KEY = "SjmZ3hPkSaJLmUx2b";

// Initialize EmailJS via REST API to bypass adblockers
(function() {
    window.sendEmailJS = async function(params) {
        const payload = {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: params
        };

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`EmailJS Error: ${response.status} ${errorText}`);
            }

            return await response.text();
        } catch (error) {
            console.error('EmailJS fetch error:', error);
            throw error;
        }
    };

    window.EMAILJS_CONFIG = {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY
    };
})();