# حبيبة دنيتي

موقع رومانسي عربي مبني بـ Next.js وTailwind CSS وMotion، ويحتوي على:

- صفحة رئيسية متحركة.
- صفحة الحكاية ومعرض الصور.
- دردشة خاصة بدون تسجيل دخول.
- رسائل نصية وصور وإيموجي وGIF مختارة.
- تخزين MongoDB وبث حي عبر Server-Sent Events.
- لعبة Snake ومشغل YouTube لأغنية «لماح» لعايض.
- بوابة دخول خاصة تغطي الصفحات والصور وواجهات API.
- اتصال WebRTC صوت وفيديو ومشاركة شاشة مع رنين وقبول ورفض.

## التشغيل المحلي

```powershell
pnpm install
pnpm dev
```

ثم افتح `http://localhost:3000`.

## متغيرات البيئة

انسخ القيم الموجودة في `.env.example` إلى `.env` محلياً، وإلى إعدادات Vercel عند النشر:

```env
MONGODB_URI=...
MONGODB_DB=habibat_dunyati
CHAT_ROOM_ID=our-private-love-room
OUR_EMAIL=...
PASSWORD=...
AUTH_SECRET=...
```

يلزم `MONGODB_URI` و`OUR_EMAIL` و`PASSWORD` للحماية والدردشة. يوصى بشدة بإضافة `AUTH_SECRET` عشوائي طويل. تُنشأ مجموعتا `messages` و`call_signals` والفهارس تلقائياً عند أول استخدام.

لضمان المكالمات بين شبكات مختلفة أضف بيانات مزود TURN اختياري:

```env
TURN_URL=turn:server.example.com:3478
TURN_USERNAME=...
TURN_CREDENTIAL=...
```

بدون TURN يحاول الموقع الاتصال عبر STUN والاتصال المباشر، وقد لا ينجح على بعض شبكات الجوال أو الشبكات المقيدة.

في MongoDB Atlas تأكد من:

1. صحة اسم المستخدم وكلمة المرور داخل رابط الاتصال.
2. إضافة عنوان الاتصال المناسب في **Network Access**. لتشغيل Vercel ذي العناوين المتغيرة يمكن السماح بـ `0.0.0.0/0` مع كلمة مرور قوية، أو استخدام اتصال شبكي أكثر تقييداً إذا كانت الخطة تدعمه.
3. إضافة `MONGODB_URI` و`OUR_EMAIL` و`PASSWORD` و`AUTH_SECRET` في **Vercel → Project Settings → Environment Variables** لكل من Production وPreview.

## النشر على Vercel

المشروع يحتوي على `vercel.json` جاهز يحدد Next.js و`pnpm` وFluid Compute ورؤوس الأمان. اربط المستودع بمشروع Vercel؛ سيكتشف Next.js تلقائياً. أمر البناء هو:

```powershell
pnpm build
```

بعد النشر افحص المسارات التالية:

- `/api/health` لفحص تشغيل التطبيق ومتغير البيئة.
- `/api/health?database=1` لفحص اتصال MongoDB الحقيقي. يجب أن يرجع `database: connected`.
- `/chat` ثم افتحه من جهازين مختلفين لاختبار الرسائل المباشرة.
- `/call` ثم افتحه من جهازين مختلفين لاختبار الصوت والفيديو ومشاركة الشاشة.

إعدادات Vercel المطلوبة:

- Framework Preset: **Next.js**.
- Node.js: **22.x**.
- Install Command: `pnpm install --frozen-lockfile`.
- Build Command: `pnpm build`.
- Output Directory: اتركه فارغاً؛ Vercel يدير خرج Next.js تلقائياً.
- Fluid Compute: مفعّل من `vercel.json`.

كل صفحات الموقع والصور وواجهات API محمية بجلسة دخول خادمية. لا تُخزّن كلمة المرور في كود العميل، وتُحفظ الجلسة في Cookie من نوع `HttpOnly` و`SameSite=Strict` لمدة سبعة أيام.

## ملاحظة تشغيل الأغنية

الموقع يحاول تشغيل فيديو YouTube تلقائياً. المتصفحات تمنع غالباً التشغيل التلقائي بصوت قبل تفاعل المستخدم، لذلك تظهر شاشة دخول رومانسية في أول زيارة؛ الضغط عليها يشغّل الأغنية فوراً بطريقة متوافقة مع سياسات المتصفح.
