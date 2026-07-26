import React from 'react';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import styles from './ContactCards.module.css';

const contacts = [
  { icon: <Phone size={24} />, title: 'Call Us', detail: '+1 (800) 123-4567', action: 'Call Now' },
  { icon: <MessageCircle size={24} />, title: 'WhatsApp', detail: 'Instant Chat', action: 'Message' },
  { icon: <Mail size={24} />, title: 'Email', detail: 'hello@anvitech.com', action: 'Send Email' },
  { icon: <MapPin size={24} />, title: 'Office', detail: '123 Tech Park, CA', action: 'Get Directions' },
];

export function ContactCards() {
  return (
    <div className={styles.grid}>
      {contacts.map((contact) => (
        <a key={contact.title} href="#" className={styles.card}>
          <div className={styles.iconWrapper}>
            {contact.icon}
          </div>
          <div className={styles.content}>
            <Typography variant="h5" className={styles.title}>{contact.title}</Typography>
            <Typography variant="body" className={styles.detail}>{contact.detail}</Typography>
          </div>
          <div className={styles.actionLabel}>
            {contact.action}
          </div>
        </a>
      ))}
    </div>
  );
}
