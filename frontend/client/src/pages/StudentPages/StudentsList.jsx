import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import StudentCard from "../../components/StudentCard";

const StudentsList = () => {
  const { getAllStudents, isStudentLoading } = useStudentStore();

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          className="input mb-1.5"
        />
        <div className="px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
          <StudentCard
            name="Lucie Stonis"
            school="Ecole Ingénieur Agitel Formation"
            location="Cocody, Abidjan"
            level="Étudiant en 3ème année"
            skill="UI/UX Design"
            photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            id="1"
          />
        </div>
      </div>
    </>
  );
};

export default StudentsList;
