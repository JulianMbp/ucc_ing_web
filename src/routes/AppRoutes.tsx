import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import GeometryExplorer from "../views/GeometryExplorer";
import HomePage from "../views/HomePage";
import LayoutsView from "../views/LayoutsView";
import SettingsView from "../views/SettingsView";
import SpeechDemoView from "../views/SpeechDemoView";
import ThreeDemoView from "../views/ThreeDemoView";

// Nuevos componentes
import ClickCounter from "../components/ClickCounter";
import MultiplicationTable from "../components/MultiplicationTable";
import PasswordValidator from "../components/PasswordValidator";
import TodoList from "../components/TodoList";
import UnitConverter from "../components/UnitConverter";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />

        {/* Nuevas rutas */}
        <Route path="multiplication-table" element={<MultiplicationTable />} />
        <Route path="unit-converter" element={<UnitConverter />} />
        <Route path="password-validator" element={<PasswordValidator />} />
        <Route path="click-counter" element={<ClickCounter />} />
        <Route path="todo-list" element={<TodoList />} />
      </Route>
    </Routes>
  );
}
