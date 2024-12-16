import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const AboutUsText: React.FC = () => {
    const { user } = useUser()
    return (
        <section className='AboutUsText' style={styles.container}>
            <div>
                <h1 style={styles.heading}>Welcome to BCard</h1>
                <p style={styles.paragraph}>
                    BCard is the perfect solution for businesses looking to present themselves in a professional and digital
                    manner. Our business cards allow you to create a personalized digital card quickly and easily, showcasing
                    your business details to anyone who needs them.
                </p>
                <p style={styles.paragraph}>
                    With BCard, you can add important details like your address, phone number, email, website links, and social
                    media profiles, creating a business card that goes directly to your clients' mobile devices.
                </p>
                <p style={styles.paragraph}>
                    Join us now and enjoy a digital business card that presents your business in the best way possible!
                </p>
                {user == undefined && <Link to="/register" style={styles.button}>
                    Join Now
                </Link>}

            </div>
        </section>
    );
};
// here i wanted to try and do styling from here cause why not :)
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        backgroundColor: '#00000080',
        borderRadius: '20px',
        color: '#fff',
        boxShadow: 'inset 0 0 10px #fff, 0 0 10px #000'
    },
    textContainer: {
        maxWidth: '800px',
        textAlign: 'center',
        padding: '20px',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    button: {
        display: 'inline-block',
        padding: '12px 30px',
        fontSize: '1rem',
        backgroundColor: '#007BFF',
        textDecoration: 'none',
        color: '#fff',
        borderRadius: '5px',
        marginTop: '20px',
    },
};

export default AboutUsText;
