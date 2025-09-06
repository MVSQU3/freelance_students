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
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          className="input m-5 w-1/2"
        />
      </div>
      <div className="px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=14"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
        <StudentCard
          name="Lucie Stonis"
          school="Ecole Ingénieur Agitel Formation"
          location="Cocody, Abidjan"
          level="Étudiant en 3ème année"
          skill="UI/UX Design"
          photo="https://avatars.githubusercontent.com/u/40762276?v=4"
          id="1"
        />
      </div>
    </>
  );
};

export default StudentsList;
