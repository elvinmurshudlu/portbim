import DesignersTable from "@/pages/Designer/components/DesignerTable/DesignersTable.tsx";
import CreateDesignerSection from "@/pages/Designer/components/DesignerForm/CreateDesignerSection.tsx";
import UpdateDesignerModal from "@/pages/Designer/components/DesignerForm/UpdateDesignerModal.tsx";

function DesignerPage() {

    return (
        < >

            <CreateDesignerSection/>
            <DesignersTable/>
            <UpdateDesignerModal/>
        </ >
    );
}

export default DesignerPage;