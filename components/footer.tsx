export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How it Works
                </a>
              </li>
              <li>
                <a href="/examples" className="text-muted-foreground hover:text-foreground">
                  Examples
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StoryMagic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}