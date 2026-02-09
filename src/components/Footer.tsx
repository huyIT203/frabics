import Link from 'next/link';
import { Logo } from '@/shared/components/brand/logo';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full border-t bg-background text-foreground/80">
            <div className="container px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Logo className="h-8 w-auto" width={150} height={35} />
                        </Link>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                            Creating premium digital experiences with modern web technologies. Quality code, beautiful design.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                                <span>123 Innovation St, Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0 text-primary" />
                                <span>hello@example.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-sm text-foreground/60">
                    <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
