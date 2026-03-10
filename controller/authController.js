import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { mechDB } from '../db/db.js';

dotenv.config();

export const signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        mechDB.query('SELECT * FROM apps WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPass = await bcrypt.hash(password, 10);

            mechDB.query('INSERT INTO apps (email, pass) VALUES (?, ?)', [email, hashedPass], (err, results) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });

                return res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
            }
            );
        }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        mechDB.query('SELECT * FROM apps WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.pass);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.MECH_SECRET_KEY || 'secretkey', { expiresIn: '1d' });

            return res.json({ message: 'Login successful', token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email } });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};