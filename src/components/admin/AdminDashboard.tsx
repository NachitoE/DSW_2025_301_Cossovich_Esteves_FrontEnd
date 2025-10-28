import { isAdmin } from "@/api";
import { useEffect, useState, type JSX } from "react";
import CreateBirdForm from "./CreateBirdForm";
import AssignBirdTraits from "./AssignBirdTraits";
import { FaPlus, FaFeather } from "react-icons/fa";

interface SidebarOption {
    text: string;
    icon: JSX.Element;
    handler: () => void;
}

export default function AdminDashboard() {
    const [admin, setAdmin] = useState(false);
    const [section, setSection] = useState<JSX.Element | null>(null);
    const [activeOption, setActiveOption] = useState<string>("");

    const sidebarOptions: SidebarOption[] = [
        {
            text: "Crear Pájaro",
            icon: <FaPlus className="w-5 h-5" />,
            handler: () => {
                setSection(<CreateBirdForm />);
                setActiveOption("Crear Pájaro");
            }
        },
        {
            text: "Asignar Características",
            icon: <FaFeather className="w-5 h-5" />,
            handler: () => {
                setSection(<AssignBirdTraits />);
                setActiveOption("Asignar Características");
            }
        }
    ];

    useEffect(() => {
        const checkAdmin = async () => {
            const _isAdmin: boolean = await isAdmin();
            setAdmin(_isAdmin);
        };
        checkAdmin();
    }, []);

    if (!admin) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-500 text-xl">
                    Tenés que ser admin para poder ver esta sección.
                </p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Panel Admin
                    </h2>
                </div>
                <nav className="p-4">
                    {sidebarOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={option.handler}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors
                                ${activeOption === option.text 
                                    ? 'bg-lime-500 text-white' 
                                    : 'text-gray-600 hover:bg-lime-50'}`}
                        >
                            {option.icon}
                            <span className="font-medium">{option.text}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {section ? (
                        section
                    ) : (
                        <div className="text-center text-gray-500 mt-20">
                            <h3 className="text-xl">
                                Selecciona una opción del menú
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}