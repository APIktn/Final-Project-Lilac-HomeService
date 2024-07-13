import React from "react";

const PolicyPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h2 className="text-2xl font-medium mb-4 text-blue-900">
          นโยบายความเป็นส่วนตัว
        </h2>
        <p className="text-sm ">
          เราให้ความสำคัญกับความเป็นส่วนตัวของคุณเป็นอย่างมาก
          กรุณาอ่านนโยบายนี้อย่างละเอียดเพื่อทำความเข้าใจเกี่ยวกับวิธีที่เรารวบรวม
          ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณ
        </p>
        <h3 className="text-lg font-medium mt-4 text-blue-900">
          1. การรวบรวมข้อมูล
        </h3>
        <p className="text-sm ">
          เราอาจรวบรวมข้อมูลส่วนบุคคลของคุณ เช่น ชื่อ นามสกุล ที่อยู่อีเมล
          เบอร์โทรศัพท์ และข้อมูลอื่นๆ
          ที่คุณให้เราเมื่อคุณลงทะเบียนหรือใช้บริการของเรา
        </p>
        <h3 className="text-lg font-medium mt-4 text-blue-900">
          2. การใช้ข้อมูล
        </h3>
        <p className="text-sm t">
          ข้อมูลส่วนบุคคลที่เรารวบรวมจะถูกใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:
          <ul className="list-disc ml-5">
            <li>เพื่อให้บริการและปรับปรุงบริการของเรา</li>
            <li>เพื่อการติดต่อและสื่อสารกับคุณ</li>
            <li>เพื่อการตลาดและโปรโมชั่น</li>
          </ul>
        </p>
        <h3 className="text-lg font-medium mt-4 text-blue-900">
          3. การปกป้องข้อมูล
        </h3>
        <p className="text-sm ">
          เราจะใช้มาตรการที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงที่ไม่ได้รับอนุญาตหรือการเปิดเผยที่ไม่เหมาะสม
        </p>
        <h3 className="text-lg font-medium mt-4 text-blue-900">
          4. การแบ่งปันข้อมูล
        </h3>
        <p className="text-sm ">
          เราจะไม่แบ่งปันข้อมูลส่วนบุคคลของคุณกับบุคคลที่สาม
          ยกเว้นในกรณีที่จำเป็นสำหรับการให้บริการของเรา
          หรือเมื่อเรามีความจำเป็นต้องปฏิบัติตามกฎหมาย
        </p>
        <h3 className="text-lg font-medium mt-4 text-blue-900">
          5. การเปลี่ยนแปลงนโยบาย
        </h3>
        <p className="text-sm ">
          เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้ได้ทุกเวลา
          โปรดตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบการเปลี่ยนแปลงใดๆ
        </p>
        <p className="text-sm ">
          หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้
          กรุณาติดต่อเราได้ที่{" "}
          <span className="font-medium text-blue-900">
            home_service@gmail.com
          </span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

export default PolicyPopup;
