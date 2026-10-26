import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const NOTIFICATION_EMAIL = 'taimour.one@gmail.com';
const BACKUP_NOTIFICATION_EMAIL = 'taimour18@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      whatsapp,
      email,
      requirement,
      propertyId,
      societyId = 'kohistan-enclave',
      propertyType,
      size,
      budget,
      purpose,
      timeline,
      leadSource = 'WEBSITE_KOHISTAN_ENCLAVE',
      notes,
      block,
      paymentPreference,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name and Phone number are required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const leadId = `lead-${Date.now()}`;

    const noteText = [
      requirement ? `Requirement: ${requirement}` : '',
      block ? `Block: ${block}` : '',
      size ? `Size: ${size}` : '',
      purpose ? `Purpose: ${purpose}` : '',
      paymentPreference ? `Payment: ${paymentPreference}` : '',
      timeline ? `Timeline: ${timeline}` : '',
      budget ? `Budget: PKR ${budget}` : '',
      whatsapp ? `WhatsApp: ${whatsapp}` : '',
      utmSource ? `UTM Source: ${utmSource}` : '',
      notes ? `Notes: ${notes}` : '',
    ].filter(Boolean).join(' | ');

    // 1. Immediately persist to local JSON file (instant zero-delay storage)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFilePath = path.join(dataDir, 'leads.json');
      let leadsList = [];
      if (fs.existsSync(leadsFilePath)) {
        try {
          const raw = fs.readFileSync(leadsFilePath, 'utf8');
          leadsList = JSON.parse(raw);
        } catch {
          leadsList = [];
        }
      }
      const newLeadEntry = {
        id: leadId,
        timestamp,
        name,
        phone,
        whatsapp: whatsapp || phone,
        email: email || null,
        societyId,
        size: size || null,
        block: block || null,
        budget: budget || null,
        purpose: purpose || null,
        paymentPreference: paymentPreference || null,
        requirement: requirement || null,
        notes: notes || null,
        source: leadSource,
        sentTo: NOTIFICATION_EMAIL,
      };
      leadsList.unshift(newLeadEntry);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leadsList, null, 2), 'utf8');
    } catch (fileErr) {
      console.warn('Failed to write lead to leads.json fallback:', fileErr);
    }

    // 2. Trigger DB & Email in async background without blocking HTTP response
    (async () => {
      // DB persistence
      try {
        await prisma.lead.create({
          data: {
            name,
            phone,
            email: email || null,
            source: leadSource,
            preferredType: propertyType || null,
            preferredSize: size || null,
            budgetMax: typeof budget === 'number' ? budget : parseFloat(budget) || null,
            notes: noteText || 'Website lead submission',
          },
        });
      } catch (dbErr) {
        console.warn('Prisma Lead creation fallback (DB unavailable or dev mode):', dbErr);
      }

    // 3. Dispatch Email Notification to taimour.one@gmail.com
    const emailSubject = `🚀 New Lead [${societyId ? societyId.toUpperCase() : 'WEBSITE'}]: ${name} (${phone})`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b0f19; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px; color: #d09a40;">ASAD LAND HOLDINGS</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #a0aec0;">High-Value Property Lead Notification</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <div style="background: #fdfbf7; border-left: 4px solid #d09a40; padding: 12px 16px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #2d3748; font-size: 15px;">Target Project: ${societyId || 'Kohistan Enclave Wah Cantt'}</p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #718096;">Lead ID: ${leadId} | Received: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} PKT</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #718096; width: 140px; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: bold;">Phone / Mobile:</td>
              <td style="padding: 8px 0; color: #1a202c;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none; font-weight: bold;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: bold;">WhatsApp:</td>
              <td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #16a34a; font-weight: bold; text-decoration: none;">Chat on WhatsApp →</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #1a202c;">${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</td>
            </tr>
            ${size ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Plot Size:</td><td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${size}</td></tr>` : ''}
            ${block ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Preferred Block:</td><td style="padding: 8px 0; color: #1a202c;">${block}</td></tr>` : ''}
            ${purpose ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Purpose:</td><td style="padding: 8px 0; color: #1a202c;">${purpose}</td></tr>` : ''}
            ${paymentPreference ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Payment Plan:</td><td style="padding: 8px 0; color: #1a202c;">${paymentPreference}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Budget:</td><td style="padding: 8px 0; color: #1a202c;">PKR ${budget}</td></tr>` : ''}
            ${requirement ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Requirement:</td><td style="padding: 8px 0; color: #1a202c;">${requirement}</td></tr>` : ''}
            ${notes ? `<tr><td style="padding: 8px 0; color: #718096; font-weight: bold;">Notes:</td><td style="padding: 8px 0; color: #1a202c;">${notes}</td></tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: bold;">Lead Source:</td>
              <td style="padding: 8px 0; color: #718096;">${leadSource}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${name}, thank you for your inquiry on Kohistan Enclave with Asad Land Holdings. How can I assist you with plot details and current rates?`)}"
               style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
              Contact Client on WhatsApp Now
            </a>
          </div>
        </div>

        <div style="background-color: #f7fafc; padding: 14px; text-align: center; font-size: 11px; color: #a0aec0; border-top: 1px solid #edf2f7;">
          This lead was automatically captured from Asad Land Holdings Kohistan Enclave Portal.<br />
          Target notification mailbox: ${NOTIFICATION_EMAIL}
        </div>
      </div>
    `;

    // Attempt email delivery with Resend if configured
    if (resend) {
      try {
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM || 'Asad Land Holdings <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: emailSubject,
          html: emailHtml,
        });

        // If Resend returns test-domain restriction error, also send to the account email
        if (emailResult.error && BACKUP_NOTIFICATION_EMAIL) {
          console.warn('Resend send warning to primary recipient:', emailResult.error.message);
          try {
            await resend.emails.send({
              from: process.env.RESEND_FROM || 'Asad Land Holdings <onboarding@resend.dev>',
              to: [BACKUP_NOTIFICATION_EMAIL],
              subject: `[FORWARDED for ${NOTIFICATION_EMAIL}] ${emailSubject}`,
              html: emailHtml,
            });
          } catch (backupErr) {
            console.warn('Backup email send error:', backupErr);
          }
        }
      } catch (emailErr) {
        console.warn('Email dispatch warning (lead safely saved to DB and leads.json):', emailErr);
      }
    }
  })();

    return NextResponse.json({
      success: true,
      message: 'Lead received and assigned to Wah Cantt advisory desk.',
      leadId,
      sentTo: NOTIFICATION_EMAIL,
    });
  } catch (error) {
    console.error('Lead submission API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing lead' },
      { status: 500 }
    );
  }
}

