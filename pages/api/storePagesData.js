export default function handler(req, res) {
    
    const pages = [
        { name: 'Cookie Policy', link: 'cookiepolicy' },
        { name: 'Accessibility Statement', link: 'accessibilitystatement' },
        { name: 'Privacy Policy', link: 'privacypolicy' },
        { name: 'Terms and Conditions', link: 'termsandconditions' },
        { name: 'Return Policy', link: 'returnpolicy' },
    ];

    res.status(200).json(pages)
}