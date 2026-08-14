import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

export function MegaNavigation({
    isAuthenticated,
}: {
    isAuthenticated: boolean;
}) {
    return (
        <>
            <DesktopNavigation isAuthenticated={isAuthenticated} />
            <MobileNavigation isAuthenticated={isAuthenticated} />
        </>
    );
}
