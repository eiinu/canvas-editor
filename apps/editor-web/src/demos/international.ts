import type { Document, Paragraph } from "@eiinu/editor-protocol";

/**
 * 辅助函数：创建功能模块标题
 */
const createSectionHeader = (title: string): Paragraph =>
  ({
    id: `header-${title.replace(/\s+/g, "-").toLowerCase()}`,
    properties: { alignment: "left", spacing: { before: 400, after: 200 } },
    children: [
      {
        properties: { fontSize: 32, bold: true, color: "#312E81", underline: "single" },
        content: { type: "text", text: `Section: ${title}` },
      },
    ],
  }) as Paragraph;

/** 国际化多语言示例数据 */
export const INTERNATIONAL_DOC: Document = {
  id: "international-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("International Languages"),
        {
          id: "p-lang-zh",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "中文：这是一段中文文本，用于测试国际化多语言支持。中文是世界上使用人数最多的语言之一，拥有悠久的历史和丰富的文化。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-en",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "English: This is an English text for testing international language support. English is a widely used language around the world, serving as a global lingua franca in many fields.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-es",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Español: Este es un texto en español para probar el soporte de idiomas internacionales. El español es hablado por más de 500 millones de personas en todo el mundo.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-ar",
          properties: { alignment: "right" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "العربية: هذا نص بالعربية لاختبار دعم اللغات الدولية. العربية لغة رسمية في العديد من البلدان والمنظمات الدولية.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-hi",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "हिन्दी: यह अंतरराष्ट्रीय भाषा समर्थन का परीक्षण करने के लिए एक हिन्दी पाठ है। हिन्दी भारत की एक प्रमुख भाषा है और विश्व की सबसे अधिक बोली जाने वाली भाषाओं में से एक है।",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-bn",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "বাংলা: এটি আন্তর্জাতিক ভাষা সমর্থন পরীক্ষা করার জন্য একটি বাংলা পাঠ্য। বাংলা বাংলাদেশ এবং ভারতের পশ্চিম বাংলার মূল ভাষা হিসেবে ব্যবহৃত হয়।",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-pt",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Português: Este é um texto em português para testar o suporte a idiomas internacionais. O português é falado em vários países, incluindo Portugal, Brasil e Angola.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-ru",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Русский: Это русский текст для тестирования поддержки международных языков. Русский язык является одним из самых распространенных языков в мире.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-ja",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "日本語: これは国際言語サポートをテストするための日本語のテキストです。日本語は日本の公用語であり、世界中の多くの人々によって話されています。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-de",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Deutsch: Dies ist ein deutscher Text zum Testen der internationalen Sprachunterstützung. Deutsch wird in Deutschland, Österreich, der Schweiz und anderen Ländern gesprochen.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-fr",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Français: Ceci est un texte français pour tester la prise en charge des langues internationales. Le français est une langue officielle dans de nombreux pays et organisations internationales.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-ko",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "한국어: 이것은 국제 언어 지원을 테스트하기 위한 한국어 텍스트입니다. 한국어는 한국과 북한의 공용 언어이며, 전 세계적으로 많은 사람들이 사용하고 있습니다.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-it",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Italiano: Questo è un testo italiano per testare il supporto per le lingue internazionali. Litaliano è parlato in Italia, Svizzera e altre regioni dEuropa.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-tr",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Türkçe: Bu uluslararası dil desteğini test etmek için bir Türkçe metindir. Türkçe Türkiyenin resmi dili olup, başka ülkelerde de konuşulmaktadır.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-vi",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Tiếng Việt: Đây là một văn bản tiếng Việt để kiểm tra hỗ trợ đa ngôn ngữ quốc tế. Tiếng Việt là ngôn ngữ chính thức của Việt Nam.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-th",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "ไทย: นี่คือข้อความภาษาไทยเพื่อทดสอบการสนับสนุนภาษาสากล ไทยเป็นภาษาอังกฤษหลักของประเทศไทย",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-id",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Bahasa Indonesia: Ini adalah teks bahasa Indonesia untuk menguji dukungan bahasa internasional. Bahasa Indonesia adalah bahasa resmi Indonesia.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-ms",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Bahasa Melayu: Ini adalah teks Bahasa Melayu untuk menguji sokongan bahasa antarabangsa. Bahasa Melayu adalah bahasa rasmi Malaysia dan Brunei.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-fa",
          properties: { alignment: "right" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "فارسی: این یک متن فارسی برای تست پشتیبانی زبان‌های بین‌المللی است. فارسی زبان رسمی ایران و بعضی از کشورهای دیگر است.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-he",
          properties: { alignment: "right" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "עברית: זהו טקסט בעברית לבדיקת תמיכה בשפות בינלאומיות. עברית היא השפה הרשמית של ישראל.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-el",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Ελληνικά: Αυτό είναι ένα ελληνικό κείμενο για τη δοκιμή της υποστήριξης διεθνών γλωσσών. Τα ελληνικά είναι η επίσημη γλώσσα της Ελλάδας.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-nl",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Nederlands: Dit is een Nederlandse tekst om de ondersteuning van internationale talen te testen. Nederlands wordt gesproken in Nederland en België.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-sv",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Svenska: Detta är en svensk text för att testa stöd för internationella språk. Svenska är det officiella språket i Sverige.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-pl",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Polski: To jest tekst po polsku do testowania obsługi języków międzynarodowych. Polski jest oficjalnym językiem Polski.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-uk",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Українська: Це український текст для тестування підтримки міжнародних мов. Українська є офіційною мовою України.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-hu",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Magyar: Ez egy magyar szöveg a nemzetközi nyelvek támogatásának tesztelésére. A magyar Magyarország hivatalos nyelve.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-cs",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Čeština: Toto je český text pro testování podpory mezinárodních jazyků. Čeština je oficiálním jazykem České republiky.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-da",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Dansk: Dette er en dansk tekst til test af understøttelse af internationale sprog. Dansk er det officielle sprog i Danmark.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-fi",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Suomi: Tämä on suomalainen teksti testataakseen kansainvälisten kielten tukea. Suomi on Suomen virallinen kieli.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-lang-no",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "Norsk: Dette er en norsk tekst for å teste støtte for internasjonale språk. Norsk er det offisielle språket i Norge.",
              },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
