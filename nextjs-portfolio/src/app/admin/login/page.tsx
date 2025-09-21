'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        // Check if user is authenticated and redirect
        const session = await getSession();
        if (session) {
          toast.success('Login successful!');
          router.push('/admin/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-login">
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          {/* Left Side - Info */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary">
            <div className="text-center text-white">
              <div className="mb-4">
                <i className="fas fa-crown" style={{ fontSize: '4rem' }}></i>
              </div>
              <h2 className="mb-3">Portfolio Admin</h2>
              <p className="lead mb-4">
                Manage your blog posts, content, and settings from one powerful dashboard.
              </p>
              <div className="features">
                <div className="feature-item mb-3">
                  <i className="fas fa-edit me-2"></i>
                  Create and edit blog posts
                </div>
                <div className="feature-item mb-3">
                  <i className="fas fa-chart-line me-2"></i>
                  Track performance and analytics
                </div>
                <div className="feature-item mb-3">
                  <i className="fas fa-cog me-2"></i>
                  Customize site settings
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="login-form-container">
              <div className="text-center mb-4">
                <h1 className="h3 mb-2">Welcome Back</h1>
                <p className="text-muted">Sign in to your admin account</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      placeholder="admin@portfolio.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center">
                  <Link href="/" className="text-decoration-none">
                    <i className="fas fa-arrow-left me-1"></i>
                    Back to Portfolio
                  </Link>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="demo-credentials mt-4 p-3 bg-light rounded">
                <h6 className="small fw-bold mb-2">Demo Credentials:</h6>
                <div className="small text-muted">
                  <div>Email: admin@portfolio.com</div>
                  <div>Password: admin123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-login {
          background: #f8f9fa;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
        }

        .login-form {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .input-group-text {
          background: #f8f9fa;
          border-color: #dee2e6;
        }

        .feature-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-credentials {
          border: 1px solid #dee2e6;
        }

        @media (max-width: 991.98px) {
          .login-form-container {
            padding: 1rem;
          }

          .login-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}