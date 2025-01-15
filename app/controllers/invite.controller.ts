import { Request, Response } from 'express';
import { sendInvitationEmail } from '../common/services/invite.service';

export const inviteUser = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
  
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return; // Explicitly return to avoid further code execution
    }
  
    try {
      const result = await sendInvitationEmail(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to send invitation', error: error.message });
    }
};
