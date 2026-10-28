import { Course } from '../types';

export const COURSE_BIO_SENIOR: Course = {
  "id": "BIO_SENIOR_FUNDAMENTAL_01",
  "name": "ชีววิทยา ม.ปลาย (สสวท. + A-Level / สอวน.)",
  "code": "BIO_SENIOR_FUNDAMENTAL_01",
  "gradeLevel": "มัธยมศึกษาตอนปลาย (ม.4 – ม.6)",
  "description": "หลักสูตรชีววิทยา ม.ปลาย ฉบับสมบูรณ์ 24 บทเรียน โครงสร้าง 4 ระดับ (Level 1 - Level 4) ครอบคลุมตามหลักสูตร สสวท. (ม.4 – ม.6 ฉบับปรับปรุง พ.ศ. 2560) ทั้งชีวโมเลกุล เซลล์ พันธุศาสตร์ พฤกษศาสตร์ กายวิภาคและสรีรวิทยาของสัตว์ วิวัฒนาการ และนิเวศวิทยา บูรณาการเทคนิคจำแม่นและข้อสอบ A-Level ชีววิทยา และ สอวน. ชีววิทยา",
  "passcode": "BIO401",
  "badgeColor": "#059669",
  "topics": [
    {
      "id": "bio_s_t1",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 1: การศึกษาชีววิทยา (Study of Biology)",
      "nameEn": "Nature of Life, Scientific Method & Bioethics",
      "sortOrder": 1,
      "subtopics": [
        {
          "id": "bio_s_t1_s1",
          "topicId": "bio_s_t1",
          "level": 1,
          "name": "1.1 ธรรมชาติและคุณสมบัติของสิ่งมีชีวิต",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การสืบพันธุ์ การเจริญเติบโต เมแทบอลิซึม การตอบสนอง ดุลยภาพ และการจัดระบบสิ่งมีชีวิต"
        },
        {
          "id": "bio_s_t1_s1_1",
          "topicId": "bio_s_t1",
          "parentId": "bio_s_t1_s1",
          "level": 2,
          "name": "วิธีการทางวิทยาศาสตร์และการออกแบบการทดลองทางชีววิทยา",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "การสังเกต ปัญหา สมมติฐาน ตัวแปรต้น ตัวแปรตาม ตัวแปรควบคุม และกลุ่มควบคุม (Control Group)"
        },
        {
          "id": "bio_s_t1_s1_2",
          "topicId": "bio_s_t1",
          "parentId": "bio_s_t1_s1",
          "level": 4,
          "name": "เทคนิค: ชีวจริยธรรม (Bioethics) และจรรยาบรรณการใช้สัตว์ทดลอง",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "หลัก 3Rs ในการทดลองกับสัตว์ (Replacement, Reduction, Refinement) และประเด็นการโคลนนิ่งมนุษย์และ GMO"
        }
      ]
    },
    {
      "id": "bio_s_t2",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 2: เคมีที่เป็นพื้นฐานของสิ่งมีชีวิต (Chemical Foundation of Life)",
      "nameEn": "Biomolecules, Water & Enzyme Kinetics",
      "sortOrder": 2,
      "subtopics": [
        {
          "id": "bio_s_t2_s1",
          "topicId": "bio_s_t2",
          "level": 1,
          "name": "2.1 น้ำ แร่ธาตุ และสมบัติทางกายภาพที่มีผลต่อชีวิต",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "พันธะไฮโดรเจนในน้ำ ความจุความร้อนสูง แรงโคฮีชัน แรงแอดฮีชัน และการรักษาดุลยภาพ"
        },
        {
          "id": "bio_s_t2_s1_1",
          "topicId": "bio_s_t2",
          "parentId": "bio_s_t2_s1",
          "level": 2,
          "name": "สารชีวโมเลกุล: คาร์โบไฮเดรตและลิพิด",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "มอโนแซ็กคาไรด์ พันธะไกลโคซิดิก โพลีแซ็กคาไรด์ (แป้ง ไกลโคเจน เซลลูโลส ไคติน), ไตรกลีเซอไรด์ กรดไขมันอิ่มตัว/ไม่อิ่มตัว ฟอสโฟลิพิด สเตียรอยด์"
        },
        {
          "id": "bio_s_t2_s1_2",
          "topicId": "bio_s_t2",
          "parentId": "bio_s_t2_s1",
          "level": 2,
          "name": "สารชีวโมเลกุล: โปรตีนและกรดนิวคลีอิก",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "กรดแอมิโน พันธะเพปไทด์ โครงสร้างโปรตีน 4 ระดับ (ปฐมภูมิ ทุติยภูมิ ตติยภูมิ จตุรภูมิ), นิวคลีโอไทด์ DNA และ RNA"
        },
        {
          "id": "bio_s_t2_s1_3",
          "topicId": "bio_s_t2",
          "parentId": "bio_s_t2_s1",
          "level": 3,
          "name": "กลไกการทำงานของเอนไซม์และจลนศาสตร์ (Enzyme Kinetics)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "พลังงานกระตุ้น ($E_a$), บริเวณเร่ง (Active Site), ปัจจัยอุณหภูมิ pH ความเข้มข้นสารตั้งต้น, ตัวยับยั้งแบบแข่งขัน (Competitive) vs ไม่แข่งขัน (Non-competitive)"
        },
        {
          "id": "bio_s_t2_s1_4",
          "topicId": "bio_s_t2",
          "parentId": "bio_s_t2_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การทดสอบสารชีวโมเลกุล (เบเนดิกต์ ไอโอดีน ไบยูเรต ซูดาน IV)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "สีผลบวกและสารตัวอย่างที่ให้ผลหลอก (เช่น น้ำตาลซูโครสไม่ทำปฏิกิริยากับเบเนดิกต์จนกว่าจะไฮโดรไลซ์)"
        }
      ]
    },
    {
      "id": "bio_s_t3",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 3: เซลล์และการทำงานของเซลล์ (Cell & Cellular Functions)",
      "nameEn": "Cell Structure, Transport, Respiration & Division",
      "sortOrder": 3,
      "subtopics": [
        {
          "id": "bio_s_t3_s1",
          "topicId": "bio_s_t3",
          "level": 1,
          "name": "3.1 กล้องจุลทรรศน์และโครงสร้างออร์แกเนลล์ของเซลล์",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "กล้องจุลทรรศน์ใช้แสง (LM) vs อิเล็กตรอน (SEM/TEM), ออร์แกเนลล์ไม่มีเยื่อหุ้ม (ไรโบโซม เซนทริโอล), เยื่อหุ้ม 1 ชั้น (ER, กอลจิ, ไลโซโซม, แวคิวโอล), เยื่อหุ้ม 2 ชั้น (ไมโทคอนเดรีย, คลอโรพลาสต์, นิวเคลียส)"
        },
        {
          "id": "bio_s_t3_s1_1",
          "topicId": "bio_s_t3",
          "parentId": "bio_s_t3_s1",
          "level": 2,
          "name": "การลำเลียงสารเข้า-ออกจากเซลล์ (Membrane Transport)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "การแพร่ธรรมดา (Simple Diffusion), การแพร่แบบฟาซิลิเทต (Facilitated), ออสโมซิส (Hypotonic, Isotonic, Hypertonic), แอกทีฟทรานสปอร์ต ($Na^+/K^+$ pump), เอนโดไซโทซิส และเอกโซไซโทซิส"
        },
        {
          "id": "bio_s_t3_s1_2",
          "topicId": "bio_s_t3",
          "parentId": "bio_s_t3_s1",
          "level": 3,
          "name": "การหายใจระดับเซลล์ (Cellular Respiration: 4 ขั้นตอน)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "1) ไกลโคไลซิส (Glycolysis ในไซโทพลาซึม) 2) การสร้างแอซีติลโคเอนไซม์ เอ 3) วัฏจักรเครบส์ (Krebs Cycle ในเมทริกซ์) 4) การถ่ายทอดอิเล็กตรอน (ETC ที่คริสตี) การคำนวณ ATP สุทธิ"
        },
        {
          "id": "bio_s_t3_s1_3",
          "topicId": "bio_s_t3",
          "parentId": "bio_s_t3_s1",
          "level": 3,
          "name": "การหมัก (Fermentation): แอลกอฮอล์ vs กรดแลกติก",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การหมักแอลกอฮอล์ในยีสต์ได้ $2\\text{ ATP} + 2\\text{ Ethanol} + 2\\text{ CO}_2$, การหมักกรดแลกติกในกล้ามเนื้อและแบคทีเรียได้ $2\\text{ ATP} + 2\\text{ Lactic acid}$"
        },
        {
          "id": "bio_s_t3_s1_4",
          "topicId": "bio_s_t3",
          "parentId": "bio_s_t3_s1",
          "level": 3,
          "name": "วัฏจักรเซลล์ การแบ่งเซลล์แบบไมโทซิส (Mitosis) และไมโอซิส (Meiosis)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "ระยะอินเตอร์เฟส ($G_1, S, G_2$), ไมโทซิสสร้างเซลล์ร่างกาย ($2n \\to 2n$), ไมโอซิสสร้างเซลล์สืบพันธุ์ ($2n \\to n$), ครอสซิงโอเวอร์ (Crossing Over) ในโพรเฟส I"
        },
        {
          "id": "bio_s_t3_s1_5",
          "topicId": "bio_s_t3",
          "parentId": "bio_s_t3_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การนับจำนวนโครโมโซมและโครมาทิดในแต่ละระยะของการแบ่งเซลล์",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เทคนิคนับเซนโทรเมียร์เพื่อระบุจำนวนโครโมโซม และการแยกระยะแอนาเฟส I vs แอนาเฟส II ในข้อสอบ A-Level"
        }
      ]
    },
    {
      "id": "bio_s_t4",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 4: โครโมโซมและสารพันธุกรรม (Chromosomes & Molecular Genetics)",
      "nameEn": "DNA Structure, Replication & Protein Synthesis",
      "sortOrder": 4,
      "subtopics": [
        {
          "id": "bio_s_t4_s1",
          "topicId": "bio_s_t4",
          "level": 1,
          "name": "4.1 โครงสร้างของ DNA และการทดลองพิสูจน์สารพันธุกรรม",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การทดลองของกริฟฟิท แอเวอรี เฮอร์ชี-เชส, โครงสร้างเกลียวคู่ (Double Helix) ของวัตสัน-คลิก, กฎชาร์กาฟฟ์ ($A=T, G=C$)"
        },
        {
          "id": "bio_s_t4_s1_1",
          "topicId": "bio_s_t4",
          "parentId": "bio_s_t4_s1",
          "level": 2,
          "name": "การจำลองดีเอ็นเอ (DNA Replication: กึ่งอนุรักษ์ Semiconservative)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เอนไซม์ที่เกี่ยวข้อง: เฮลิเคส (Helicase), โทโพไอโซเมอเรส, ไพรเมส (Primase), DNA โพลิเมอเรส, DNA ไลเกส, สาย Leading strand vs Lagging strand (Okazaki fragments)"
        },
        {
          "id": "bio_s_t4_s1_2",
          "topicId": "bio_s_t4",
          "parentId": "bio_s_t4_s1",
          "level": 3,
          "name": "การแสดงออกของยีน: การถอดรหัส (Transcription) และการแปลรหัส (Translation)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การสร้าง mRNA จากสายแม่แบบ DNA, โคดอนเริ่มต้น (AUG) และโคดอนหยุด (UAA, UAG, UGA), ไรโบโซมและ tRNA ขนส่งกรดแอมิโน"
        },
        {
          "id": "bio_s_t4_s1_3",
          "topicId": "bio_s_t4",
          "parentId": "bio_s_t4_s1",
          "level": 3,
          "name": "มิวเทชัน (Mutation): ระดับยีนและระดับโครโมโซม",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การแทนที่คู่เบส (Silent, Missense, Nonsense), เฟรมชิฟต์ (Frameshift Insertion/Deletion), โครโมโซมผิดปกติ (Down, Turner, Klinefelter, Cri-du-chat syndrome)"
        },
        {
          "id": "bio_s_t4_s1_4",
          "topicId": "bio_s_t4",
          "parentId": "bio_s_t4_s1",
          "level": 4,
          "name": "เทคนิค: เทคนิคอ่านทิศทาง $5' \\to 3'$ ของสายแม่แบบ โคดอน และแอนติโคดอน",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "กฎเหล็ก: เอนไซม์สังเคราะห์สายใหม่ในทิศ $5' \\to 3'$ เสมอ และการอ่านตารางรหัสพันธุกรรมจากสาย mRNA เท่านั้น"
        }
      ]
    },
    {
      "id": "bio_s_t5",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 5: การถ่ายทอดทางพันธุกรรม (Genetic Inheritance)",
      "nameEn": "Mendel's Laws, Pedigree & Gene Interactions",
      "sortOrder": 5,
      "subtopics": [
        {
          "id": "bio_s_t5_s1",
          "topicId": "bio_s_t5",
          "level": 1,
          "name": "5.1 กฎของเมนเดลข้อที่ 1 และข้อที่ 2 (Segregation & Independent Assortment)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การผสมพิจารณาลักษณะเดียว (Monohybrid Cross: อัตราส่วนฟีโนไทป์ $3:1$), การผสมพิจารณาสองลักษณะ (Dihybrid Cross: $9:3:3:1$), พันธุ์แท้ vs พันธุ์ทาง"
        },
        {
          "id": "bio_s_t5_s1_1",
          "topicId": "bio_s_t5",
          "parentId": "bio_s_t5_s1",
          "level": 2,
          "name": "ส่วนขยายกฎเมนเดล: เด่นไม่สมบูรณ์ เด่นร่วม และมัลติเปิลแอลลีล",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เด่นไม่สมบูรณ์ (ดอกบานเย็น สีชมพู $1:2:1$), เด่นร่วม (หมู่เลือด AB), มัลติเปิลแอลลีล (หมู่เลือดระบบ ABO ยีน $I^A, I^B, i$)"
        },
        {
          "id": "bio_s_t5_s1_2",
          "topicId": "bio_s_t5",
          "parentId": "bio_s_t5_s1",
          "level": 3,
          "name": "พันธุกรรมที่เกี่ยวข้องกับเพศ (Sex-linked & Sex-influenced Traits)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ยีนด้อยบนโครโมโซม X (ตาบอดสี ฮีโมฟีเลีย $G6PD$), ลักษณะควบคุมด้วยเพศ (ศีรษะล้าน), ลักษณะจำกัดเพศ"
        },
        {
          "id": "bio_s_t5_s1_3",
          "topicId": "bio_s_t5",
          "parentId": "bio_s_t5_s1",
          "level": 3,
          "name": "การวิเคราะห์พันธุประวัติหรือเพ็ดดีกรี (Pedigree Analysis)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การสืบย้อนหายีนแฝง: Autosomal Dominant vs Autosomal Recessive vs X-linked Recessive"
        },
        {
          "id": "bio_s_t5_s1_4",
          "topicId": "bio_s_t5",
          "parentId": "bio_s_t5_s1",
          "level": 4,
          "name": "เทคนิค: 4 กฎทองในการตัดสินชนิดเพ็ดดีกรีภายใน 15 วินาที",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "เทคนิคฟันธง: พ่อแม่ปกติแต่ลูกเป็นโรค = ยีนด้อยแน่นอน, พ่อแม่เป็นโรคแต่ลูกปกติ = ยีนเด่นแน่นอน, แม่เป็นโรคลูกชายทุกคนต้องเป็นโรค = X-linked recessive"
        }
      ]
    },
    {
      "id": "bio_s_t6",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 6: เทคโนโลยีทางดีเอ็นเอ (DNA Technology)",
      "nameEn": "Recombinant DNA, PCR & Biotechnology",
      "sortOrder": 6,
      "subtopics": [
        {
          "id": "bio_s_t6_s1",
          "topicId": "bio_s_t6",
          "level": 1,
          "name": "6.1 เทคโนโลยีดีเอ็นเอรีคอมบิแนนท์ (Recombinant DNA Technology)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "เอนไซม์ตัดจำเพาะ (Restriction Enzymes), เอนไซม์ DNA ไลเกส, เวกเตอร์พลาสมิด (Plasmid), การโคลนยีนในแบคทีเรีย"
        },
        {
          "id": "bio_s_t6_s1_1",
          "topicId": "bio_s_t6",
          "parentId": "bio_s_t6_s1",
          "level": 2,
          "name": "การเพิ่มจำนวน DNA ด้วยเทคนิคพีซีอาร์ (PCR) และเจลอิเล็กโทรโฟริซิส",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ขั้นตอน PCR (Denaturation $95^\\circ\\text{C}$, Annealing $55^\\circ\\text{C}$, Extension $72^\\circ\\text{C}$ ด้วย Taq Polymerase), Gel Electrophoresis แยกขนาดโมเลกุล DNA"
        },
        {
          "id": "bio_s_t6_s1_2",
          "topicId": "bio_s_t6",
          "parentId": "bio_s_t6_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การอ่านลายพิมพ์ดีเอ็นเอ (DNA Fingerprint) ในคดีนิติวิทยาศาสตร์และตรวจบิดามารดา",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "แถบ DNA ของลูกทุกแถบต้องตรงกับแถบของพ่อหรือแม่แถบใดแถบหนึ่งเสมอ"
        }
      ]
    },
    {
      "id": "bio_s_t7",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 7: วิวัฒนาการ (Evolution)",
      "nameEn": "Evidence, Natural Selection & Population Genetics",
      "sortOrder": 7,
      "subtopics": [
        {
          "id": "bio_s_t7_s1",
          "topicId": "bio_s_t7",
          "level": 1,
          "name": "7.1 หลักฐานและทฤษฎีวิวัฒนาการ (ลามาร์ก vs ชาลส์ ดาร์วิน)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "หลักฐานซากดึกดำบรรพ์ กายวิภาคเปรียบเทียบ (Homologous vs Analogous Structures), ทฤษฎีการคัดเลือกโดยธรรมชาติ (Natural Selection)"
        },
        {
          "id": "bio_s_t7_s1_1",
          "topicId": "bio_s_t7",
          "parentId": "bio_s_t7_s1",
          "level": 2,
          "name": "พันธุศาสตร์ประชากรและสมดุลฮาร์ดี-ไวน์เบิร์ก (Hardy-Weinberg Equilibrium)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "สมการ $p + q = 1$ และ $p^2 + 2pq + q^2 = 1$, 5 เงื่อนไขที่ทำให้ประชากรอยู่ในสมดุล, ปัจจัยที่ทำให้เกิดวิวัฒนาการ (Genetic Drift, Gene Flow, Non-random Mating)"
        },
        {
          "id": "bio_s_t7_s1_2",
          "topicId": "bio_s_t7",
          "parentId": "bio_s_t7_s1",
          "level": 3,
          "name": "การกำเนิดสปีชีส์ใหม่ (Speciation) และกลไกการแยกกันทางการสืบพันธุ์",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "Allopatric (แยกด้วยภูมิศาสตร์) vs Sympatric speciation, กลไกก่อนระยะไซโกตและหลังระยะไซโกต (ลูกผสมเป็นหมัน)"
        },
        {
          "id": "bio_s_t7_s1_3",
          "topicId": "bio_s_t7",
          "parentId": "bio_s_t7_s1",
          "level": 4,
          "name": "เทคนิค: สูตรคำนวณฮาร์ดี-ไวน์เบิร์ก เริ่มต้นจาก $q^2$ (ฟีโนไทป์ด้อย) เสมอ",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "การแก้โจทย์พาหะ $2pq$ โดยหา $q = \\sqrt{\\text{สัดส่วนคนเป็นโรค}}$ แล้วหา $p = 1 - q$"
        }
      ]
    },
    {
      "id": "bio_s_t8",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 8: โครงสร้างและการเจริญเติบโตของพืชดอก (Plant Structure & Growth)",
      "nameEn": "Plant Tissues, Root, Stem & Leaf Anatomy",
      "sortOrder": 8,
      "subtopics": [
        {
          "id": "bio_s_t8_s1",
          "topicId": "bio_s_t8",
          "level": 1,
          "name": "8.1 เนื้อเยื่อพืช: เนื้อเยื่อเจริญ (Meristem) และเนื้อเยื่อถาวร (Permanent Tissue)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "เนื้อเยื่อเจริญส่วนปลาย ส่วนข้าง (แคมเบียม), เนื้อเยื่อถาวรเชิงเดี่ยว (พาเรงคิมา คอลเลงคิมา สเกลอเรนคิมา) และเชิงซ้อน (ไซเลม โฟลเอม)"
        },
        {
          "id": "bio_s_t8_s1_1",
          "topicId": "bio_s_t8",
          "parentId": "bio_s_t8_s1",
          "level": 2,
          "name": "โครงสร้างภาคตัดขวางของราก ลำต้น และใบ (พืชใบเลี้ยงคู่ vs ใบเลี้ยงเดี่ยว)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เอพิเดอร์มิส คอร์เทกซ์ สตีล วาสคิวลาร์บันเดิล รูปแฉกในรากใบเลี้ยงคู่ vs กระจายในลำต้นใบเลี้ยงเดี่ยว, โครงสร้างใบ พาลิเซดและสปันจีมีโซฟิลล์"
        },
        {
          "id": "bio_s_t8_s1_2",
          "topicId": "bio_s_t8",
          "parentId": "bio_s_t8_s1",
          "level": 4,
          "name": "เทคนิค: ตารางเปรียบเทียบภาคตัดขวางราก-ลำต้น พืชใบเลี้ยงเดี่ยว-คู่ ไม่สับสนในห้องสอบ",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "จำจุดเด่น: รากมีเอนโดเดอร์มิสชัดเจน ลำต้นไม่มี คอร์เทกซ์รากกว้างกว่าลำต้น"
        }
      ]
    },
    {
      "id": "bio_s_t9",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 9: การลำเลียงของพืช (Plant Transport System)",
      "nameEn": "Xylem Water Transport & Phloem Translocation",
      "sortOrder": 9,
      "subtopics": [
        {
          "id": "bio_s_t9_s1",
          "topicId": "bio_s_t9",
          "level": 1,
          "name": "9.1 การดูดน้ำและแร่ธาตุเข้าสู่ราก: อโพพลาสต์ ซิมพลาสต์ และแถบแคสพาเรียน",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "Apoplast (ผ่านผนังเซลล์), Symplast (ผ่านพลาสโมเดสมาตา), Casparian strip บังคับให้น้ำเข้าสู่ซิมพลาสต์ที่เอนโดเดอร์มิส"
        },
        {
          "id": "bio_s_t9_s1_1",
          "topicId": "bio_s_t9",
          "parentId": "bio_s_t9_s1",
          "level": 2,
          "name": "กลไกลำเลียงน้ำในไซเลม: แรงดึงจากการคายน้ำ (Transpiration Pull) และการคายน้ำทางปากใบ",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "แรงโคฮีชัน-แอดฮีชัน, กลไกการเปิด-ปิดปากใบของเซลล์คุม ($K^+$ pump), ปรากฏการณ์กัตเตชัน (Guttation ผ่านไฮดาโทด)"
        },
        {
          "id": "bio_s_t9_s1_2",
          "topicId": "bio_s_t9",
          "parentId": "bio_s_t9_s1",
          "level": 3,
          "name": "การลำเลียงสารอาหารในโฟลเอม: สมมติฐานแรงดันกระแส (Pressure-Flow Hypothesis)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การขนถ่ายน้ำตาลซูโครสจากแหล่งสร้าง (Source) เข้าสู่ตะแกรงท่อซีฟทิวบ์ (Sieve tube) ไปยังแหล่งรับ (Sink)"
        }
      ]
    },
    {
      "id": "bio_s_t10",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 10: การสังเคราะห์ด้วยแสง (Photosynthesis)",
      "nameEn": "Light Reactions, Calvin Cycle & C3 C4 CAM Plants",
      "sortOrder": 10,
      "subtopics": [
        {
          "id": "bio_s_t10_s1",
          "topicId": "bio_s_t10",
          "level": 1,
          "name": "10.1 ปฏิกิริยาแสง (Light Reactions) ในไทลาคอยด์",
          "sortOrder": 1,
          "difficulty": "intermediate",
          "description": "ระบบแสง I ($P_{700}$) และระบบแสง II ($P_{680}$), การถ่ายทอดอิเล็กตรอนแบบเป็นวัฏจักรและไม่เป็นวัฏจักร, การแตกตัวของน้ำ (Photolysis) ได้ $O_2$, การสังเคราะห์ $ATP$ และ $NADPH$"
        },
        {
          "id": "bio_s_t10_s1_1",
          "topicId": "bio_s_t10",
          "parentId": "bio_s_t10_s1",
          "level": 2,
          "name": "วัฏจักรแคลวิน (Calvin Cycle / Dark Reactions) ในสโตรมา",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "3 ขั้นตอน: 1) การตรึงคาร์บอน (Carboxylation โดยเอนไซม์ RuBisCO) 2) รีดักชัน (Reduction ได้ G3P/PGAL) 3) รีเจเนอเรชัน (Regeneration คืน RuBP)"
        },
        {
          "id": "bio_s_t10_s1_2",
          "topicId": "bio_s_t10",
          "parentId": "bio_s_t10_s1",
          "level": 3,
          "name": "การเปรียบเทียบกลไกการตรึงคาร์บอนของพืช $C_3, C_4$ และพืช $CAM$",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "พืช $C_4$ (ข้าวโพด อ้อย ตรึง $CO_2$ สองครั้งที่มีโซฟิลล์และบันเดิลชีท), พืช $CAM$ (สับปะรด กระบองเพชร เปิดปากใบตอนกลางคืน เก็บในรูปกรดมาลิกในแวคิวโอล)"
        },
        {
          "id": "bio_s_t10_s1_3",
          "topicId": "bio_s_t10",
          "parentId": "bio_s_t10_s1",
          "level": 4,
          "name": "เทคนิค: ปัจจัยจำกัดของการสังเคราะห์ด้วยแสง จุดชดเชยแสงและจุดอิ่มตัวแสง",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "Light Compensation Point (อัตราการสังเคราะห์แสง = อัตราการหายใจ ปริมาณ $CO_2$ สุทธิเป็นศูนย์) และการเกิด Photorespiration"
        }
      ]
    },
    {
      "id": "bio_s_t11",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 11: การสืบพันธุ์ของพืชดอก (Reproduction of Flowering Plants)",
      "nameEn": "Alternation of Generations & Double Fertilization",
      "sortOrder": 11,
      "subtopics": [
        {
          "id": "bio_s_t11_s1",
          "topicId": "bio_s_t11",
          "level": 1,
          "name": "11.1 โครงสร้างของดอกและการสร้างเซลล์สืบพันธุ์",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "วัฏจักรชีวิตแบบสลับ (สปอโรไฟต์ $2n$ เด่น vs แกมีโทไฟต์ $n$), การสร้างละอองเรณูในอับเรณู และการสร้างถุงเอ็มบริโอในออวุล (มี 7 เซลล์ 8 นิวเคลียส)"
        },
        {
          "id": "bio_s_t11_s1_1",
          "topicId": "bio_s_t11",
          "parentId": "bio_s_t11_s1",
          "level": 2,
          "name": "การถ่ายละอองเรณูและการปฏิสนธิคู่ (Double Fertilization)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "สเปิร์มตัวที่ 1 รวมกับไข่ ได้ไซโกต ($2n$) เจริญเป็นเอ็มบริโอ; สเปิร์มตัวที่ 2 รวมกับโพลาร์นิวคลีไอ ได้เอนโดสเปิร์ม ($3n$) เป็นอาหารสะสม"
        },
        {
          "id": "bio_s_t11_s1_2",
          "topicId": "bio_s_t11",
          "parentId": "bio_s_t11_s1",
          "level": 4,
          "name": "เทคนิค: การเปลี่ยนแปลงหลังการปฏิสนธิ (รังไข่ $\\to$ ผล, ออวุล $\\to$ เมล็ด, ผนังรังไข่ $\\to$ เปลือกผล)",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "การจำแนกผลเดี่ยว ผลกลุ่ม (น้อยหน่า สตรอว์เบอร์รี) และผลรวม (สับปะรด ขนุน ยอ) จุดออกสอบประจำ"
        }
      ]
    },
    {
      "id": "bio_s_t12",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 12: การตอบสนองของพืช (Plant Responses & Hormones)",
      "nameEn": "Plant Hormones & Tropisms",
      "sortOrder": 12,
      "subtopics": [
        {
          "id": "bio_s_t12_s1",
          "topicId": "bio_s_t12",
          "level": 1,
          "name": "12.1 ฮอร์โมนพืช 5 กลุ่มหลัก (Auxin, Gibberellin, Cytokinin, Ethylene, ABA)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ออกซิน (การยืดตัวของเซลล์ ปลายยอดเอนหาแสง), จิบเบอเรลลิน (ลำต้นยืด พักตัวของเมล็ดแตก), ไซโทไคนิน (การแบ่งเซลล์ ชะลอความชรา), เอทิลีน (ผลไม้สุก ใบไม้ร่วง), กรดแอบไซซิก (กระตุ้นปากใบปิดเมื่อขาดน้ำ)"
        },
        {
          "id": "bio_s_t12_s1_1",
          "topicId": "bio_s_t12",
          "parentId": "bio_s_t12_s1",
          "level": 2,
          "name": "การเคลื่อนไหวของพืช: แบบมีทิศทางสัมพันธ์กับสิ่งเร้า (Tropism) vs ไร้ทิศทาง (Nastic)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "Phototropism, Gravitropism, Thigmotropism (มือเกาะ), การหุบของใบไมยราบและการปิดของกาบหอยแครงเกิดจากการเปลี่ยนแปลงแรงดันเต่ง (Turgor Pressure)"
        }
      ]
    },
    {
      "id": "bio_s_t13",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 13: ระบบย่อยอาหาร (Digestive System)",
      "nameEn": "Digestion in Animals & Human Gastrointestinal Tract",
      "sortOrder": 13,
      "subtopics": [
        {
          "id": "bio_s_t13_s1",
          "topicId": "bio_s_t13",
          "level": 1,
          "name": "13.1 การย่อยอาหารของสัตว์เซลล์เดียว สัตว์ไม่มีกระดูกสันหลัง และสัตว์เคี้ยวเอื้อง",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การย่อยภายในเซลล์ (อะมีบา พารามีเซียม ฟองน้ำ), การย่อยภายนอกเซลล์ (ไฮดรา พลานาเรีย แมลง), กระเพาะ 4 ส่วนของสัตว์เคี้ยวเอื้อง (รูเมน เรติคิวลัม โอมาซัม อะโบมาซัม)"
        },
        {
          "id": "bio_s_t13_s1_1",
          "topicId": "bio_s_t13",
          "parentId": "bio_s_t13_s1",
          "level": 2,
          "name": "อวัยวะและการย่อยเชิงกลเชิงเคมีในทางเดินอาหารของมนุษย์",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ปาก (อะไมเลส), กระเพาะอาหาร (กรด $HCl$, เพปซิน ย่อยโปรตีน), ตับสร้างน้ำดีทำให้อนุภาคไขมันแตกตัว, ตับอ่อนสร้างเอนไซม์ทุกประเภท"
        },
        {
          "id": "bio_s_t13_s1_2",
          "topicId": "bio_s_t13",
          "parentId": "bio_s_t13_s1",
          "level": 3,
          "name": "การดูดซึมสารอาหารที่ลำไส้เล็ก (Villus & Microvilli)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "หลอดเลือดฝอยดูดซึมกลูโคส กรดแอมิโน วิตามินละลายน้ำ ($B, C$) เข้าสู่ Hepatic Portal Vein; ท่อน้ำเหลืองฝอย (Lacteal) ดูดซึมกรดไขมัน กลีเซอรอล วิตามิน $A, D, E, K$"
        },
        {
          "id": "bio_s_t13_s1_3",
          "topicId": "bio_s_t13",
          "parentId": "bio_s_t13_s1",
          "level": 4,
          "name": "เทคนิค: สรุปผังเอนไซม์ย่อยโปรตีนแบบกระตุ้นต่อเนื่อง (Cascade Activation)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "เอนเทอโรไคเนส เปลี่ยนทริปซิโนเจน $\\to$ ทริปซิน แล้วทริปซินไปกระตุ้นเอนไซม์อื่น ๆ ต่อไป"
        }
      ]
    },
    {
      "id": "bio_s_t14",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 14: ระบบหายใจและการแลกเปลี่ยนแก๊ส (Respiratory System)",
      "nameEn": "Gas Exchange Structures, Mechanics & Gas Transport",
      "sortOrder": 14,
      "subtopics": [
        {
          "id": "bio_s_t14_s1",
          "topicId": "bio_s_t14",
          "level": 1,
          "name": "14.1 โครงสร้างแลกเปลี่ยนแก๊สของสัตว์: ผิวหนัง เหงือก ท่อลม ปอด",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ไส้เดือนดิน (ผิวหนังชุ่มชื้น), ปลา (เหงือกแบบ Countercurrent Exchange), แมลง (ระบบท่อลม Tracheal System ไม่อาศัยเลือด), นก (ปอดพร้อมถุงลม Air sacs ไหลทางเดียว)"
        },
        {
          "id": "bio_s_t14_s1_1",
          "topicId": "bio_s_t14",
          "parentId": "bio_s_t14_s1",
          "level": 2,
          "name": "กลไกการหายใจเข้า-ออกของมนุษย์ (Breathing Mechanics)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "หายใจเข้า: กะบังลมหดตัวลดต่ำลง กล้ามเนื้อซี่โครงแถบนอกหดตัวยกสูงขึ้น ปริมาตรช่องอกเพิ่ม ความดันลด; หายใจออกเกิดการคลายตัวสลับกัน"
        },
        {
          "id": "bio_s_t14_s1_2",
          "topicId": "bio_s_t14",
          "parentId": "bio_s_t14_s1",
          "level": 3,
          "name": "การลำเลียงออกซิเจนและคาร์บอนไดออกไซด์ในกระแสเลือด",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$O_2$ จับกับฮีโมโกลบิน ($HbO_2$), $CO_2$ ส่วนใหญ่ลำเลียงในรูปไฮโดรเจนคาร์บอเนตไอออน ($HCO_3^-$ ในพลาสมา) เกิดสมดุลกรด-เบสในเลือด"
        },
        {
          "id": "bio_s_t14_s1_3",
          "topicId": "bio_s_t14",
          "parentId": "bio_s_t14_s1",
          "level": 4,
          "name": "เทคนิค: ศูนย์ควบคุมการหายใจในสมอง (Medulla Oblongata ตรวจจับ $H^+$ และ $CO_2$ เป็นหลัก)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "ไม่ใช่ปริมาณ $O_2$ ที่กระตุ้นการหายใจ แต่เป็นปริมาณกรดคาร์บอนิกและ $H^+$ จาก $CO_2$ ในเลือด"
        }
      ]
    },
    {
      "id": "bio_s_t15",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 15: ระบบหมุนเวียนเลือดและระบบน้ำเหลือง (Circulatory & Immune Systems)",
      "nameEn": "Heart, Blood Vessels, Blood Typing & Immunity",
      "sortOrder": 15,
      "subtopics": [
        {
          "id": "bio_s_t15_s1",
          "topicId": "bio_s_t15",
          "level": 1,
          "name": "15.1 ระบบหมุนเวียนเลือดแบบเปิด vs แบบปิด และโครงสร้างหัวใจมนุษย์",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ระบบเปิด (แมลง เลือดปนของเหลวเนื้อเยื่อ Hemolymph), ระบบปิด (ไส้เดือน สัตว์มีกระดูกสันหลัง), หัวใจ 4 ห้อง ลิ้นหัวใจ ไบคัสปิด ไตรคัสปิด เซมิลูนาร์"
        },
        {
          "id": "bio_s_t15_s1_1",
          "topicId": "bio_s_t15",
          "parentId": "bio_s_t15_s1",
          "level": 2,
          "name": "หลอดเลือด ความดันเลือด หมู่เลือด ($ABO, Rh$) และการให้-รับเลือด",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "Artery ผนังหนายืดหยุ่น, Vein มีลิ้นกั้นความดันต่ำ, Capillary แลกเปลี่ยนสาร, ความดัน Systolic/Diastolic, กฎการให้เลือด: แอนติเจนของผู้ให้ต้องไม่ตรงกับแอนติบอดีของผู้รับ"
        },
        {
          "id": "bio_s_t15_s1_2",
          "topicId": "bio_s_t15",
          "parentId": "bio_s_t15_s1",
          "level": 3,
          "name": "ระบบภูมิคุ้มกันแบบไม่จำเพาะ (Innate) และแบบจำเพาะ (Adaptive Immunity)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "เม็ดเลือดขาวฟาโกไซต์ (นิวโทรฟิล โมโนไซต์ แมโครฟาจ), ภูมิคุ้มกันจำเพาะ: B-cell ผลิตแอนติบอดี (Humoral Immunity), T-cell ทำลายเซลล์ติดเชื้อ (Cell-mediated Immunity)"
        },
        {
          "id": "bio_s_t15_s1_3",
          "topicId": "bio_s_t15",
          "parentId": "bio_s_t15_s1",
          "level": 3,
          "name": "ภูมิคุ้มกันก่อเอง (Active: วัคซีน ท็อกซอยด์) vs ภูมิคุ้มกันรับมา (Passive: เซรุ่ม น้ำนมแม่)",
          "sortOrder": 4,
          "difficulty": "basic",
          "description": "ภูมิคุ้มกันก่อเองสร้างเซลล์ความจำ (Memory cells) อยู่ได้นานแต่ให้ผลช้า, ภูมิคุ้มกันรับมาแก้พิษได้ทันทีแต่อยู่ได้ไม่นาน"
        }
      ]
    },
    {
      "id": "bio_s_t16",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 16: ระบบขับถ่าย (Excretory System)",
      "nameEn": "Nitrogenous Wastes, Kidney Anatomy & Nephron Function",
      "sortOrder": 16,
      "subtopics": [
        {
          "id": "bio_s_t16_s1",
          "topicId": "bio_s_t16",
          "level": 1,
          "name": "16.1 การจำแนกของเสียไนโตรเจน (แอมโมเนีย ยูเรีย กรดยูริก) ของสัตว์ชนิดต่าง ๆ",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "แอมโมเนีย (สัตว์น้ำ เป็นพิษสูงใช้น้ำขับมาก), ยูเรีย (สัตว์เลี้ยงลูกด้วยน้ำนม สัตว์สะเทินน้ำสะเทินบก), กรดยูริก (สัตว์ปีก สัตว์เลื้อยคลาน แมลง พิษต่ำสุด ไม่สูญเสียน้ำ)"
        },
        {
          "id": "bio_s_t16_s1_1",
          "topicId": "bio_s_t16",
          "parentId": "bio_s_t16_s1",
          "level": 2,
          "name": "โครงสร้างไตและหน่วยไต (Nephron): การกรอง การดูดกลับ และการหลั่ง",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "โกลเมอรูลัสและโบว์แมนส์แคปซูล (กรองสาร), ท่อขดส่วนต้น (ดูดกลับกลูโคสและกรดแอมิโน 100%), ห่วงเฮนเล (ดูดน้ำและเกลือแร่), ท่อขดส่วนปลายและท่อรวม (หลั่ง $H^+, K^+$)"
        },
        {
          "id": "bio_s_t16_s1_2",
          "topicId": "bio_s_t16",
          "parentId": "bio_s_t16_s1",
          "level": 3,
          "name": "การควบคุมดุลยภาพน้ำและแร่ธาตุ: ฮอร์โมน ADH และแอลโดสเตอโรน (Aldosterone)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "เมื่อร่างกายขาดน้ำ: ต่อมใต้สมองส่วนหลังหลั่ง $ADH$ กระตุ้นท่อรวมดูดน้ำกลับ ปัสสาวะเข้มข้น; แอลโดสเตอโรนกระตุ้นดูดกลับ $Na^+$ ขับ $K^+$"
        },
        {
          "id": "bio_s_t16_s1_3",
          "topicId": "bio_s_t16",
          "parentId": "bio_s_t16_s1",
          "level": 4,
          "name": "เทคนิค: สารที่ไม่พบในปัสสาวะของคนปกติ (โปรตีนขนาดใหญ่และกลูโคส)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "หากตรวจพบกลูโคสในปัสสาวะบ่งชี้ภาวะเบาหวาน หรือถ้าพบโปรตีน/เม็ดเลือดแดงบ่งชี้โกลเมอรูลัสอักเสบรั่ว"
        }
      ]
    },
    {
      "id": "bio_s_t17",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 17: ระบบประสาทและอวัยวะรับความรู้สึก (Nervous System & Sensory Organs)",
      "nameEn": "Action Potential, Synapse, Brain, Spinal Cord & Senses",
      "sortOrder": 17,
      "subtopics": [
        {
          "id": "bio_s_t17_s1",
          "topicId": "bio_s_t17",
          "level": 1,
          "name": "17.1 โครงสร้างเซลล์ประสาทและการเกิดกระแสประสาท (Action Potential)",
          "sortOrder": 1,
          "difficulty": "intermediate",
          "description": "ระยะพัก (Resting $-70\\text{ mV}$ เกิดจาก $Na^+/K^+$ pump), เดโพลาไรเซชัน ($Na^+$ ไหลเข้าข้างในกลายเป็น $+30\\text{ mV}$), รีโพลาไรเซชัน ($K^+$ ไหลออก), ไฮเพอร์โพลาไรเซชัน"
        },
        {
          "id": "bio_s_t17_s1_1",
          "topicId": "bio_s_t17",
          "parentId": "bio_s_t17_s1",
          "level": 2,
          "name": "การถ่ายทอดกระแสประสาทผ่านไซแนปส์ (Synapse & Neurotransmitters)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "แคลเซียมไอออนกระตุ้นการหลั่งสารสื่อประสาท (เช่น แอซีติลโคลีน อะดรีนาลีน) ข้ามช่องไซแนปส์ไปจับกับตัวรับที่เดนไดรต์ของเซลล์ถัดไป"
        },
        {
          "id": "bio_s_t17_s1_2",
          "topicId": "bio_s_t17",
          "parentId": "bio_s_t17_s1",
          "level": 3,
          "name": "โครงสร้างและหน้าที่ของสมองส่วนหน้า ส่วนกลาง ส่วนหลัง และไขสันหลัง",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "เซรีบรัม (ความคิด ความจำ), ทาลามัส (ศูนย์รวมรีเลย์กระแสประสาท), ไฮโพทาลามัส (อุณหภูมิ ความหิว ดุลยภาพ ฮอร์โมน), เซรีเบลลัม (การทรงตัว), เมดัลลาและพอนส์ (การหายใจ การเต้นของหัวใจ)"
        },
        {
          "id": "bio_s_t17_s1_3",
          "topicId": "bio_s_t17",
          "parentId": "bio_s_t17_s1",
          "level": 3,
          "name": "ระบบประสาทอัตโนวัติ: ซิมพาเทติก (Sympathetic) vs พาราซิมพาเทติก (Parasympathetic)",
          "sortOrder": 4,
          "difficulty": "basic",
          "description": "ซิมพาเทติก (สู้หรือหนี Fight or Flight: หัวใจเต้นเร็ว ม่านตาขยาย ยับยั้งย่อยอาหาร), พาราซิมพาเทติก (พักผ่อน Rest and Digest: หัวใจเต้นช้า กระตุ้นย่อยอาหาร)"
        },
        {
          "id": "bio_s_t17_s1_4",
          "topicId": "bio_s_t17",
          "parentId": "bio_s_t17_s1",
          "level": 4,
          "name": "เทคนิค: รีเฟล็กซ์อาร์ก (Reflex Arc) และการทำงานของเซลล์ประสาทรับความรู้สึก-ประสานงาน-สั่งการ",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "การกระตุกเข่า (Knee-jerk Reflex) มีเซลล์ประสาทเพียง 2 ตัว ไม่มีเซลล์ประสาทประสานงานในไขสันหลัง"
        }
      ]
    },
    {
      "id": "bio_s_t18",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 18: การเคลื่อนที่ของสิ่งมีชีวิต (Locomotion)",
      "nameEn": "Animal & Human Skeletal-Muscular Systems",
      "sortOrder": 18,
      "subtopics": [
        {
          "id": "bio_s_t18_s1",
          "topicId": "bio_s_t18",
          "level": 1,
          "name": "18.1 การเคลื่อนที่ของสิ่งมีชีวิตเซลล์เดียวและสัตว์ไม่มีกระดูกสันหลัง",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "เท้าเทียม (Pseudopodium ของอะมีบาด้วยไซโคลซิส), ซิเลียและแฟลเจลลัม (โครงสร้างไมโครทูบูล $9+2$), การทำงานตรงข้ามของกล้ามเนื้อวงและกล้ามเนื้อตามยาวในไส้เดือนดิน"
        },
        {
          "id": "bio_s_t18_s1_1",
          "topicId": "bio_s_t18",
          "parentId": "bio_s_t18_s1",
          "level": 2,
          "name": "ระบบโครงกระดูก ข้อต่อ และการทำงานของกล้ามเนื้อลายแบบ Antagonism ของมนุษย์",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "กระดูกแกน (80 ชิ้น) และกระดูกรยางค์ (126 ชิ้น), เอ็นยึดกระดูก (Ligament) vs เอ็นยึดกล้ามเนื้อ (Tendon), การทำงานแบบคานง้างคู่ตรงข้าม (Biceps หดตัว + Triceps คลายตัว)"
        },
        {
          "id": "bio_s_t18_s1_2",
          "topicId": "bio_s_t18",
          "parentId": "bio_s_t18_s1",
          "level": 3,
          "name": "กลไกการหดตัวของกล้ามเนื้อ: ทฤษฎีการเลื่อนตัวของเส้นใยโปรตีน (Sliding Filament Theory)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ไมโอฟิลาเมนต์: แอกทิน (เส้นใยบาง) และไมโอซิน (เส้นใยหนา), บทบาทของ $Ca^{2+}$ จับกับโทรโปนิน เปิดตำแหน่งให้หัวไมโอซินจับกับแอกทินโดยใช้พลังงาน $ATP$"
        }
      ]
    },
    {
      "id": "bio_s_t19",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 19: ระบบต่อมไร้ท่อ (Endocrine System)",
      "nameEn": "Hormones, Endocrine Glands & Feedback Control",
      "sortOrder": 19,
      "subtopics": [
        {
          "id": "bio_s_t19_s1",
          "topicId": "bio_s_t19",
          "level": 1,
          "name": "19.1 ประเภทฮอร์โมนและกลไกการควบคุมแบบป้อนกลับ (Feedback Mechanism)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ฮอร์โมนเพปไทด์ (จับตัวรับบนเยื่อหุ้มเซลล์) vs ฮอร์โมนสเตียรอยด์ (ซึมผ่านเยื่อหุ้มเซลล์จับตัวรับในไซโทพลาซึม/นิวเคลียส), การควบคุมแบบป้อนกลับยับยั้ง (Negative Feedback)"
        },
        {
          "id": "bio_s_t19_s1_1",
          "topicId": "bio_s_t19",
          "parentId": "bio_s_t19_s1",
          "level": 2,
          "name": "ต่อมใต้สมอง (Pituitary) ต่อมไทรอยด์ และต่อมพาราไทรอยด์",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ต่อมใต้สมองส่วนหน้าสร้าง $GH, TSH, ACTH, FSH, LH, Prolactin$; ส่วนหลังหลั่ง $ADH, Oxytocin$; ไทรอยด์สร้างไทรอกซินและแคลซิโทนิน (ลด $Ca^{2+}$ ในเลือด); พาราไทรอยด์สร้างพาราทอร์โมน (เพิ่ม $Ca^{2+}$ ในเลือด)"
        },
        {
          "id": "bio_s_t19_s1_2",
          "topicId": "bio_s_t19",
          "parentId": "bio_s_t19_s1",
          "level": 2,
          "name": "ตับอ่อน (Pancreas) และต่อมหมวกไต (Adrenal Glands)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ไอส์เลตส์ออฟแลงเกอร์ฮานส์: เซลล์เบตาหลั่งอินซูลิน (ลดน้ำตาลในเลือด), เซลล์แอลฟาหลั่งกลูคากอน (เพิ่มน้ำตาลในเลือด); ต่อมหมวกไตชั้นนอกหลั่งคอร์ติซอล แอลโดสเตอโรน, ชั้นในหลั่งอะดรีนาลีน"
        },
        {
          "id": "bio_s_t19_s1_3",
          "topicId": "bio_s_t19",
          "parentId": "bio_s_t19_s1",
          "level": 4,
          "name": "เทคนิค: ตารางจับคู่ฮอร์โมนคู่ตรงข้ามที่ควบคุมสภาวะสมดุล (Antagonistic Hormones)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "อินซูลิน vs กลูคากอน, แคลซิโทนิน vs พาราทอร์โมน เทคนิคจำเร็วทำคะแนนสูง"
        }
      ]
    },
    {
      "id": "bio_s_t20",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 20: ระบบสืบพันธุ์และการเจริญเติบโต (Reproduction & Development)",
      "nameEn": "Human Reproduction, Menstrual Cycle & Embryology",
      "sortOrder": 20,
      "subtopics": [
        {
          "id": "bio_s_t20_s1",
          "topicId": "bio_s_t20",
          "level": 1,
          "name": "20.1 โครงสร้างและการสร้างเซลล์สืบพันธุ์เพศชายและเพศหญิง",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "อัณฑะ เซลล์เลย์ดิก เซลล์เซอร์โตลิ การสร้างสเปิร์ม (Spermatogenesis ได้ 4 อสุจิ), รังไข่ การสร้างเซลล์ไข่ (Oogenesis ได้ 1 ไข่ + 3 โพลาร์บอดี)"
        },
        {
          "id": "bio_s_t20_s1_1",
          "topicId": "bio_s_t20",
          "parentId": "bio_s_t20_s1",
          "level": 2,
          "name": "รอบเดือน (Menstrual Cycle) และการควบคุมโดยฮอร์โมน $FSH, LH, Estrogen, Progesterone$",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "การเจริญของฟอลลิเคิล $\\to$ ระดับเอสโตรเจนกระตุ้น $LH$ surge ทำให้เกิดการตกไข่ (วันที่ 14) $\\to$ ฟอลลิเคิลกลายเป็นคอร์ปัสลูเทียมหลั่งโปรเจสเตอโรนสร้างผนังมดลูกรองรับการฝังตัว"
        },
        {
          "id": "bio_s_t20_s1_2",
          "topicId": "bio_s_t20",
          "parentId": "bio_s_t20_s1",
          "level": 3,
          "name": "การเจริญเติบโตของเอ็มบริโอ (Embryology: Cleavage, Blastula, Gastrula, Organogenesis)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การแบ่งเซลล์แบบคลีเวจ $\\to$ บลาสทูลา (มีช่องบลาสโทซีล) $\\to$ แกสตรูลา (เกิดเนื้อเยื่อ 3 ชั้น: เอกโทเดิร์ม เมโซเดิร์ม เอนโดเดิร์ม)"
        },
        {
          "id": "bio_s_t20_s1_3",
          "topicId": "bio_s_t20",
          "parentId": "bio_s_t20_s1",
          "level": 4,
          "name": "เทคนิค: อวัยวะที่เจริญจากเนื้อเยื่อ 3 ชั้นในข้อสอบ A-Level",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "เอกโทเดิร์มเจริญเป็นผิวหนังชั้นนอกและระบบประสาททั้งหมด, เมโซเดิร์มเจริญเป็นกล้ามเนื้อ กระดูก หัวใจ เลือด ไต, เอนโดเดิร์มเจริญเป็นเยื่อบุทางเดินอาหาร ปอด ตับ"
        }
      ]
    },
    {
      "id": "bio_s_t21",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 21: พฤติกรรมของสัตว์ (Animal Behavior)",
      "nameEn": "Innate & Learned Behaviors, Social Communication",
      "sortOrder": 21,
      "subtopics": [
        {
          "id": "bio_s_t21_s1",
          "topicId": "bio_s_t21",
          "level": 1,
          "name": "21.1 พฤติกรรมแต่กำเนิด (Innate Behavior): โอเรียนเทชัน รีเฟล็กซ์ และ FAP",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ไคนีซิส (เคลื่อนที่ไร้ทิศทาง เช่น ตัวกะปิ), แทกซิส (เคลื่อนที่มีทิศทางสัมพันธ์กับสิ่งเร้า เช่น แมลงเม่าบินเข้าหาแสง), รีเฟล็กซ์ต่อเนื่อง (Fixed Action Pattern: FAP เช่น การกกไข่ของห่าน)"
        },
        {
          "id": "bio_s_t21_s1_1",
          "topicId": "bio_s_t21",
          "parentId": "bio_s_t21_s1",
          "level": 2,
          "name": "พฤติกรรมการเรียนรู้ (Learned Behavior): ความเคยชิน ฝังใจ ลองผิดลองถูก มีเงื่อนไข ใช้เหตุผล",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "Habituation (ความเคยชิน), Imprinting (การฝังใจ เช่น ลูกเป็ดเดินตามแม่), Classical Conditioning (การมีเงื่อนไข เช่น สุนัขของพาฟลอฟ), Operant Conditioning (ลองผิดลองถูก), Reasoning (การใช้เหตุผลในไพรเมต)"
        },
        {
          "id": "bio_s_t21_s1_2",
          "topicId": "bio_s_t21",
          "parentId": "bio_s_t21_s1",
          "level": 4,
          "name": "เทคนิค: การสื่อสารระหว่างสัตว์ด้วยสารเคมี (ฟีโรโมน) เสียง ท่าทาง และการเต้นระบำของผึ้ง",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "การเต้นแบบวงกลม (Round dance: แหล่งอาหารใกล้ $< 50\\text{ m}$) vs การเต้นส่ายก้น (Waggle dance: บอกระยะทางและมุมทิศทางกับดวงอาทิตย์)"
        }
      ]
    },
    {
      "id": "bio_s_t22",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 22: ความหลากหลายทางชีวภาพ (Biodiversity)",
      "nameEn": "Taxonomy, Phylogeny & The Kingdoms of Life",
      "sortOrder": 22,
      "subtopics": [
        {
          "id": "bio_s_t22_s1",
          "topicId": "bio_s_t22",
          "level": 1,
          "name": "22.1 อนุกรมวิธาน การจัดหมวดหมู่ และการตั้งชื่อวิทยาศาสตร์ (Binomial Nomenclature)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ลำดับขั้นอนุกรมวิธาน (Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species), การเขียนชื่อวิทยาศาสตร์ระบบทวินามของลินเนียส"
        },
        {
          "id": "bio_s_t22_s1_1",
          "topicId": "bio_s_t22",
          "parentId": "bio_s_t22_s1",
          "level": 2,
          "name": "อาณาจักรมอเนราและโพรทิสตา (Monera & Protista)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "โพรแคริโอต: แบคทีเรีย แบคทีเรียโบราณ (Archaea) สาหร่ายสีเขียวแกมน้ำเงิน; ยูแคริโอตเซลล์เดียว/หลายเซลล์ไม่มีเนื้อเยื่อ: โพรโทซัว สาหร่าย ราเมือก"
        },
        {
          "id": "bio_s_t22_s1_2",
          "topicId": "bio_s_t22",
          "parentId": "bio_s_t22_s1",
          "level": 2,
          "name": "อาณาจักรฟังไจและอาณาจักรพืช (Fungi & Plantae)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ฟังไจ (ยีสต์ รา เห็ด มีผนังเซลล์ไคติน ย่อยภายนอกเซลล์); พืชไม่มีท่อลำเลียง (มอส ลิเวอร์เวิร์ต), พืชมีท่อลำเลียงไร้เมล็ด (เฟิน หวายทะนอย), พืชเมล็ดเปลือย (สน ปรง แปะก๊วย), พืชดอก (Angiosperms)"
        },
        {
          "id": "bio_s_t22_s1_3",
          "topicId": "bio_s_t22",
          "parentId": "bio_s_t22_s1",
          "level": 3,
          "name": "อาณาจักรสัตว์ 9 ไฟลัมหลัก (Animalia)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "Porifera (ฟองน้ำ), Cnidaria (แมงกะพรุน ไฮดรา), Platyhelminthes (หนอนตัวแบน), Nematoda (หนอนตัวกลม), Annelida (หนอนปล้อง), Arthropoda (ขาข้อ มีโครงร่างแข็ง), Mollusca (ลำตัวนิ่ม หอย หมึก), Echinodermata (ดาวทะเล มีระบบท่อน้ำ), Chordata (คอร์เดต)"
        },
        {
          "id": "bio_s_t22_s1_4",
          "topicId": "bio_s_t22",
          "parentId": "bio_s_t22_s1",
          "level": 4,
          "name": "เทคนิค: ไดโคโทมัสคีย์ (Dichotomous Key) และแผนภูมิต้นไม้วิวัฒนาการ (Phylogenetic Tree)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "การฝึกอ่านคีย์แยกสิ่งมีชีวิตเป็นคู่ ๆ และการวิเคราะห์ Cladogram หาบรรพบุรุษร่วม"
        }
      ]
    },
    {
      "id": "bio_s_t23",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 23: ระบบนิเวศและประชากร (Ecology and Populations)",
      "nameEn": "Biomes, Energy Flow, Nutrient Cycles & Population Dynamics",
      "sortOrder": 23,
      "subtopics": [
        {
          "id": "bio_s_t23_s1",
          "topicId": "bio_s_t23",
          "level": 1,
          "name": "23.1 ไบโอมบนบกและในน้ำ (Biomes)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ทุนดรา (มีเพอร์มาฟรอสต์ น้ำแข็งใต้ดิน), ไทกา (ป่าสน), ป่าผลัดใบเขตอบอุ่น, ทุ่งหญ้าสะวันนา, ทะเลทราย, ป่าดิบชื้น (ความหลากหลายสูงสุด)"
        },
        {
          "id": "bio_s_t23_s1_1",
          "topicId": "bio_s_t23",
          "parentId": "bio_s_t23_s1",
          "level": 2,
          "name": "การถ่ายทอดพลังงาน ห่วงโซ่อาหาร และสายใยอาหาร (Food Chains & Food Webs)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ผู้ผลิต ผู้บริโภค ผู้สลายสารอินทรีย์, กฎ 10 เปอร์เซ็นต์ (10% Law of Energy Transfer), พีระมิดพลังงาน พีระมิดมวลชีวภาพ พีระมิดจำนวน"
        },
        {
          "id": "bio_s_t23_s1_2",
          "topicId": "bio_s_t23",
          "parentId": "bio_s_t23_s1",
          "level": 2,
          "name": "ความสัมพันธ์ระหว่างสิ่งมีชีวิตและการสะสมสารพิษ (Biological Magnification)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ภาวะพึ่งพากัน ($+,+$ แยกไม่ได้), ได้ประโยชน์ร่วมกัน ($+,+$ แยกได้), อิงอาศัย ($+,0$), การล่าเหยื่อ ($+,-$), ปรสิต ($+,-$), ภาวะแก่งแย่งแข่งขัน ($-,-$), สารพิษสะสมสูงสุดที่ผู้บริโภคลำดับบนสุด"
        },
        {
          "id": "bio_s_t23_s1_3",
          "topicId": "bio_s_t23",
          "parentId": "bio_s_t23_s1",
          "level": 3,
          "name": "ประชากรและการเติบโต: แบบเอกซ์โพเนนเชียล (J-shaped) vs แบบลอจิสติก (S-shaped)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "อัตราการเกิด ตาย ย้ายเข้า ย้ายออก, ความจุที่สิ่งแวดล้อมรองรับได้ (Carrying Capacity: $K$), พีระมิดโครงสร้างอายุประชากร"
        },
        {
          "id": "bio_s_t23_s1_4",
          "topicId": "bio_s_t23",
          "parentId": "bio_s_t23_s1",
          "level": 3,
          "name": "การเปลี่ยนแปลงแทนที่ของระบบนิเวศ (Ecological Succession: ขั้นปฐมภูมิ vs ทุติยภูมิ)",
          "sortOrder": 5,
          "difficulty": "basic",
          "description": "ปฐมภูมิ (เริ่มจากหินเปล่า ลาวาภูเขาไฟ สิ่งมีชีวิตบุกเบิกคือไลเคน) vs ทุติยภูมิ (เริ่มจากพื้นที่เคยมีสิ่งมีชีวิตแต่ถูกทำลาย เช่น ไฟไหม้ป่า น้ำท่วม ดำเนินเร็วกว่า)"
        }
      ]
    },
    {
      "id": "bio_s_t24",
      "subjectId": "BIO_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 24: มนุษย์กับความยั่งยืนของสิ่งแวดล้อม (Environmental Sustainability)",
      "nameEn": "Global Warming, Pollution & Sustainable Resource Management",
      "sortOrder": 24,
      "subtopics": [
        {
          "id": "bio_s_t24_s1",
          "topicId": "bio_s_t24",
          "level": 1,
          "name": "24.1 ปัญหาสิ่งแวดล้อมระดับโลก: ภาวะโลกร้อน ฝนกรด และการลดลงของโอโซน",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "แก๊สเรือนกระจก ($CO_2, CH_4, N_2O, CFCs$), ฝนกรด ($SO_2, NO_x$), สาร $CFCs$ ทำลายชั้นโอโซน ($O_3$)"
        },
        {
          "id": "bio_s_t24_s1_1",
          "topicId": "bio_s_t24",
          "parentId": "bio_s_t24_s1",
          "level": 2,
          "name": "มลพิษทางน้ำ ยูโทรฟิเคชัน (Eutrophication) และการบำบัดน้ำเสีย",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "การชะล้างปุ๋ยไนโตรเจนและฟอสเฟตลงแหล่งน้ำ สาหร่ายบูม น้ำเน่าเสีย, ค่า $DO$ ต่ำ และค่า $BOD$ สูง"
        },
        {
          "id": "bio_s_t24_s1_2",
          "topicId": "bio_s_t24",
          "parentId": "bio_s_t24_s1",
          "level": 4,
          "name": "เทคนิค: ชนิดพันธุ์ต่างถิ่นที่รุกราน (Invasive Alien Species) และการพัฒนาที่ยั่งยืน (SDGs)",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "ตัวอย่างในไทย: ผักตบชวา ปลาชะโดคางดำ หอยเชอรี่ และหลักการอนุรักษ์ทรัพยากรธรรมชาติแบบยั่งยืน"
        }
      ]
    }
  ]
};
