import React, { useState, useEffect } from 'react';
import { StudySchedulePlan } from '../../types';
import { useApp } from '../../context/AppContext';
import { generatePromptPayQrDataUrl } from '../../lib/promptpay';
import {
  X,
  CreditCard,
  QrCode,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface PromptPayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: StudySchedulePlan;
}

export const PromptPayPaymentModal: React.FC<PromptPayPaymentModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const {
    currentUserRole,
    currentUser,
    students,
    courses,
    submitSchedulePaymentSlip,
    confirmSchedulePayment,
    teacherPromptPay,
  } = useApp();

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingQr, setIsGeneratingQr] = useState<boolean>(true);
  const [slipFileBase64, setSlipFileBase64] = useState<string>('');
  const [slipNote, setSlipNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const student = students.find((s) => s.id === plan.studentId);
  const course = courses.find((c) => c.id === plan.courseId);

  const promptPayNumber = plan.promptPayNumber || teacherPromptPay.number || '0812345678';
  const accountName = plan.promptPayAccountName || teacherPromptPay.name || 'อาจารย์แม็ก (MaxUp)';
  const amount = plan.priceAmount || 0;

  // Generate PromptPay QR code
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGeneratingQr(true);

    if (plan.promptPayQrUrl) {
      setQrDataUrl(plan.promptPayQrUrl);
      setIsGeneratingQr(false);
      return;
    }

    if (promptPayNumber) {
      generatePromptPayQrDataUrl(promptPayNumber, amount > 0 ? amount : undefined)
        .then((url) => {
          if (isMounted) {
            setQrDataUrl(url);
            setIsGeneratingQr(false);
          }
        })
        .catch(() => {
          if (isMounted) setIsGeneratingQr(false);
        });
    } else {
      setIsGeneratingQr(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, promptPayNumber, amount, plan.promptPayQrUrl]);

  if (!isOpen) return null;

  const handleCopyPromptPay = () => {
    navigator.clipboard.writeText(promptPayNumber.replace(/[^0-9]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedbackMsg({ type: 'error', text: 'กรุณาอัปโหลดไฟล์รูปภาพสลิป (PNG, JPG, WebP)' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSlipFileBase64(result);
      setFeedbackMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleStudentSubmitSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slipFileBase64) {
      setFeedbackMsg({ type: 'error', text: 'กรุณาเลือกรูปภาพสลิปการโอนเงินก่อนกดยืนยัน' });
      return;
    }

    setIsSubmitting(true);
    try {
      submitSchedulePaymentSlip(plan.id, slipFileBase64, slipNote.trim());
      setFeedbackMsg({
        type: 'success',
        text: 'แนบสลิปเรียบร้อยแล้ว! อยู่ระหว่างรอคุณครู Max ตรวจสอบและกดยืนยันยอดเงิน',
      });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    } catch {
      setFeedbackMsg({ type: 'error', text: 'เกิดข้อผิดพลาดในการบันทึกสลิป กรุณาลองใหม่อีกครั้ง' });
      setIsSubmitting(false);
    }
  };

  const handleTeacherConfirm = (confirmed: boolean) => {
    confirmSchedulePayment(plan.id, confirmed);
    setFeedbackMsg({
      type: 'success',
      text: confirmed
        ? 'ยืนยันการรับชำระเงินเรียบร้อยแล้ว!'
        : 'ปรับสถานะเป็นรอการชำระเงินเรียบร้อย',
    });
  };

  const isPaid = plan.paymentStatus === 'paid';
  const hasUploadedSlip = plan.paymentStatus === 'slip_uploaded' || !!plan.paymentSlipUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FFFDF7] w-full max-w-xl rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-white border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/60 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-800" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {currentUserRole === 'admin'
                  ? 'ตรวจสอบและจัดการการชำระเงิน (Payment & Slip)'
                  : 'ชำระค่าเรียนผ่าน PromptPay (สแกนจ่าย & แนบสลิป)'}
              </h2>
              <p className="text-xs text-slate-500">
                {plan.title} · {course?.name || 'คอร์สเรียน'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {feedbackMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {/* Lesson & Fee Summary Banner */}
          <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">ข้อมูลคาบเรียน</span>
                <h3 className="text-sm font-bold text-slate-900">{plan.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    {new Date(plan.date).toLocaleDateString('th-TH', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {plan.startTime} - {plan.endTime} ({plan.durationHours} ชม.)
                  </span>
                  {student && (
                    <>
                      <span>·</span>
                      <span className="font-semibold text-slate-700">
                        นร: {student.nickname} ({student.fullName})
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isPaid
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : hasUploadedSlip
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {isPaid ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>ชำระเงินเรียบร้อยแล้ว</span>
                    </>
                  ) : hasUploadedSlip ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>แนบสลิปแล้ว (รอครูตรวจ)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      <span>รอชำระเงิน</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Price Strip */}
            <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-medium">ยอดเงินที่ต้องชำระ</span>
                <div className="text-xs text-slate-600">
                  {amount > 0 ? `คำนวณตามคาบเรียน ${plan.durationHours} ชม.` : 'ยังไม่ได้ระบุจำนวนเงิน'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-950 font-mono">
                  ฿{amount > 0 ? amount.toLocaleString() : '0'}
                </span>
                <span className="text-xs text-slate-500 ml-1">บาท</span>
              </div>
            </div>
          </div>

          {/* Section 1: PromptPay QR Code Display */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-blue-900" />
                <span>ช่องทางชำระเงิน: พร้อมเพย์ (PromptPay)</span>
              </h4>
              <span className="text-[10px] text-slate-400">สแกนผ่าน Mobile Banking ทุกธนาคาร</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
              {/* QR Code Container */}
              <div className="bg-white p-3 rounded-2xl border-2 border-blue-900/20 shadow-md flex flex-col items-center shrink-0 w-52">
                {/* Official Thai PromptPay Banner Header */}
                <div className="w-full bg-[#003B64] text-white text-[11px] font-bold py-1 px-2 rounded-t-lg flex items-center justify-center gap-1.5 mb-2 shadow-xs">
                  <span className="text-amber-400 font-black">THAI QR</span>
                  <span className="text-white">PAYMENT</span>
                </div>

                <div className="w-44 h-44 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                  {isGeneratingQr ? (
                    <div className="text-xs text-slate-400 flex flex-col items-center gap-1">
                      <Clock className="w-5 h-5 animate-spin text-blue-900" />
                      <span>กำลังสร้าง QR Code...</span>
                    </div>
                  ) : qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="PromptPay QR Code"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-xs text-slate-400 text-center p-2">
                      ยังไม่มีรูปภาพ QR Code พร้อมเพย์
                    </div>
                  )}
                </div>

                <div className="text-center mt-2">
                  <div className="text-[11px] font-bold text-slate-900 truncate max-w-[190px]">
                    {accountName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    พร้อมเพย์: {promptPayNumber}
                  </div>
                </div>
              </div>

              {/* Instructions and Copy details */}
              <div className="space-y-3 flex-1 text-xs">
                <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/70 space-y-2">
                  <div className="text-slate-700">
                    <span className="text-slate-500 block text-[11px]">ชื่อบัญชีผู้รับ:</span>
                    <strong className="text-slate-900 font-semibold">{accountName}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">หมายเลขพร้อมเพย์:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-bold text-blue-950 text-sm bg-white px-2 py-0.5 rounded border border-slate-200">
                        {promptPayNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPromptPay}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-[11px] font-semibold flex items-center gap-1 border border-blue-200 cursor-pointer transition-all"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-amber-100">
                    <span className="text-slate-500 block text-[11px]">จำนวนเงินที่ต้องโอน:</span>
                    <span className="font-mono font-bold text-amber-800 text-base">
                      ฿{amount > 0 ? amount.toLocaleString() : '0.00'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>1. เปิดแอปธนาคารใดก็ได้ แล้วเลือกเมนู "สแกน QR"</p>
                  <p>2. บันทึกรูป QR Code นี้ หรือสแกนเพื่อโอนเงินตามยอดที่ระบุ</p>
                  <p>3. เมื่อโอนแล้ว ให้อัปโหลดรูปสลิปด้านล่างเพื่อให้คุณครู Max ยืนยัน</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Transfer Slip Upload & Verification */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>
                  {currentUserRole === 'admin'
                    ? 'สลิปหลักฐานการโอนเงิน (Slip Verification)'
                    : 'แนบสลิปการโอนเงิน (Upload Transfer Slip)'}
                </span>
              </h4>
              {plan.slipUploadedAt && (
                <span className="text-[10px] text-slate-400">
                  อัปโหลดเมื่อ: {new Date(plan.slipUploadedAt).toLocaleString('th-TH')}
                </span>
              )}
            </div>

            {/* Display Existing Slip if present */}
            {(plan.paymentSlipUrl || slipFileBase64) && (
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block">
                  รูปภาพสลิปการโอนเงิน:
                </span>
                <div className="max-h-72 overflow-hidden rounded-xl border border-slate-200 bg-black/5 flex items-center justify-center">
                  <img
                    src={slipFileBase64 || plan.paymentSlipUrl}
                    alt="หลักฐานการโอนเงิน"
                    className="max-h-72 object-contain rounded-lg"
                  />
                </div>

                {plan.paymentSlipNote && (
                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800">บันทึกจากนักเรียน: </span>
                    <span>{plan.paymentSlipNote}</span>
                  </div>
                )}
              </div>
            )}

            {/* Teacher Verification Actions */}
            {currentUserRole === 'admin' && (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    คุณครู Max: ตรวจสอบความถูกต้องและกดยืนยันยอดเงิน
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ยอดเงิน: <strong>฿{amount.toLocaleString()} บาท</strong>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {!isPaid ? (
                    <button
                      type="button"
                      onClick={() => handleTeacherConfirm(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>✓ ยืนยันได้รับเงินแล้ว (ตรวจสลิปผ่าน)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTeacherConfirm(false)}
                      className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      ยกเลิกสถานะชำระแล้ว (เปลี่ยนเป็นรอตรวจ)
                    </button>
                  )}

                  {hasUploadedSlip && !isPaid && (
                    <button
                      type="button"
                      onClick={() => {
                        submitSchedulePaymentSlip(plan.id, '', 'คุณครูขอให้แนบสลิปใหม่อีกครั้ง');
                        setSlipFileBase64('');
                        setFeedbackMsg({
                          type: 'success',
                          text: 'รีเซ็ตสลิปเรียบร้อยแล้ว แจ้งให้นักเรียนแนบสลิปใหม่',
                        });
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      ขอให้แนบสลิปใหม่
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Student Upload Form */}
            {currentUserRole === 'student' && !isPaid && (
              <form onSubmit={handleStudentSubmitSlip} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {hasUploadedSlip ? 'ต้องการเปลี่ยนหรือแนบสลิปใหม่:' : 'แนบรูปสลิปการโอนเงิน *'}
                  </label>
                  <label className="border-2 border-dashed border-amber-300 hover:border-blue-500 bg-amber-50/20 hover:bg-blue-50/20 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all text-center">
                    <Upload className="w-6 h-6 text-amber-700 mb-1.5" />
                    <span className="text-xs font-bold text-slate-800">
                      คลิกเพื่อเลือกรูปภาพสลิป หรือลากไฟล์มาวางที่นี่
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      รองรับไฟล์ JPG, PNG, WebP
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ข้อความเพิ่มเติม / เวลาที่โอน (Optional)
                  </label>
                  <input
                    type="text"
                    value={slipNote}
                    onChange={(e) => setSlipNote(e.target.value)}
                    placeholder="เช่น โอนเวลา 15:30 น. ผ่านธนาคารกสิกรไทย"
                    className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !slipFileBase64}
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันแนบสลิปให้คุณครูตรวจ'}</span>
                  </button>
                </div>
              </form>
            )}

            {isPaid && currentUserRole === 'student' && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-xs font-bold text-emerald-900">
                  คุณครู Max ได้ตรวจสอบสลิปและยืนยันการชำระเงินเรียบร้อยแล้ว
                </h5>
                <p className="text-[11px] text-emerald-700">
                  ขอบคุณครับ ขอให้สนุกและเต็มที่กับการเรียนในคาบนี้ครับ!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
