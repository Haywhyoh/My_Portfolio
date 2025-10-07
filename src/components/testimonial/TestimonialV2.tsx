'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Pagination } from 'swiper/modules';
import { TestimonialProps, Testimonial } from '@/lib/types';
import { getTestimonialsForDisplay } from '@/lib/testimonials';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialV2 = ({
    sectionClass,
    showOnlyFeatured = true,
    maxItems = 6,
    autoplay = true,
    showPagination = true
}: TestimonialProps) => {

    // Get testimonials data
    const testimonials = getTestimonialsForDisplay({
        maxItems,
        featuredOnly: showOnlyFeatured,
        minRating: 4
    });

    // Render stars based on rating
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <i
                key={index}
                className={`fas fa-star ${index < rating ? '' : 'text-muted'}`}
            />
        ));
    };

    // Single testimonial card component for dark theme
    const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
        <div className="testimonial-style-one dark-variant">
            <div className="item">
                <div className="thumb">
                    <div className="inner">
                        <img src={testimonial.avatar} alt={`${testimonial.name} - ${testimonial.company}`} />
                    </div>
                </div>
                <div className="content">
                    <div className="tm-review">
                        <div className="top">
                            <h5>Reviews On</h5>
                            {renderStars(testimonial.rating)}
                        </div>
                        <div className="bottom">
                            {/* Use light version of platform logo for dark theme */}
                            <img
                                src={testimonial.platformLogo.replace('.png', '-light.png').replace('.jpg', '-light.jpg').replace('.jpeg', '-light.jpeg') || testimonial.platformLogo}
                                alt="Review Platform"
                                onError={(e) => {
                                    // Fallback to original image if light version doesn't exist
                                    e.currentTarget.src = testimonial.platformLogo;
                                }}
                            />
                            <p>{testimonial.platformRating}/ {testimonial.reviewCount} Reviews</p>
                        </div>
                    </div>
                    <p>
                        &ldquo;{testimonial.testimonial}&rdquo;
                    </p>
                    <div className="tm-footer">
                        <div className="provider">
                            <h4>{testimonial.name}</h4>
                            <span>{testimonial.position}, {testimonial.company}</span>
                        </div>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className={`testimonial-style-one-area default-padding testimonial-dark-theme ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-left-top">
                    <img src="/assets/img/shape/10.png" alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="heading-left">
                        <div className="row">
                            <div className="col-xl-6">
                                <h4 className="sub-title text-light">Testimonials</h4>
                                <h2 className="title text-white">Clients Testimonials</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="testimonial-style-one-items">
                                {testimonials.length > 0 ? (
                                    <Swiper
                                        modules={[Keyboard, Autoplay, Pagination]}
                                        direction="horizontal"
                                        loop={testimonials.length > 1}
                                        autoplay={autoplay ? {
                                            delay: 5000,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        } : false}
                                        keyboard={{
                                            enabled: true,
                                            onlyInViewport: true
                                        }}
                                        pagination={showPagination ? {
                                            el: '.testimonial-pagination .swiper-pagination',
                                            type: 'bullets',
                                            clickable: true,
                                        } : false}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        speed={600}
                                        className="testimonials-swiper dark-theme"
                                    >
                                        {testimonials.map((testimonial, index) => (
                                            <SwiperSlide key={testimonial.id}>
                                                <TestimonialCard testimonial={testimonial} index={index} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <div className="no-testimonials text-center py-5">
                                        <p className="text-light">No testimonials available at the moment.</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {showPagination && testimonials.length > 1 && (
                                    <div className="testimonial-pagination dark-pagination">
                                        <div className="swiper-pagination" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialV2;