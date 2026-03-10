import { useParams, Navigate, useLocation } from 'react-router-dom';
import { useEffect, ComponentType } from 'react';
import { businesses, type Business } from '@/data/businesses';
import { BusinessContext } from '@/contexts/BusinessContext';
import EmberOakSite from '@/components/sites/EmberOakSite';
import ClearviewSite from '@/components/sites/ClearviewSite';
import PrescottSite from '@/components/sites/PrescottSite';
import ForgeSite from '@/components/sites/ForgeSite';
import MeridianSite from '@/components/sites/MeridianSite';
import NorthpointSite from '@/components/sites/NorthpointSite';
import MaisonBelleSite from '@/components/sites/MaisonBelleSite';
import LumenSite from '@/components/sites/LumenSite';
import WhitestoneSite from '@/components/sites/WhitestoneSite';
import SaffronSite from '@/components/sites/SaffronSite';

const siteMap: Record<string, ComponentType<{ business: Business; page: string }>> = {
  'ember-oak': EmberOakSite,
  'clearview-dental': ClearviewSite,
  'prescott-hartley': PrescottSite,
  'forge-athletics': ForgeSite,
  'meridian-properties': MeridianSite,
  'northpoint-advisory': NorthpointSite,
  'maison-belle': MaisonBelleSite,
  'lumen-studio': LumenSite,
  'whitestone-co': WhitestoneSite,
  'saffron-vine': SaffronSite,
};

export default function BusinessSite() {
  const { slug } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const business = businesses.find(b => b.slug === slug);
  if (!business) return <Navigate to="/" replace />;

  const SiteComponent = siteMap[business.slug];
  if (!SiteComponent) return <Navigate to="/" replace />;

  const pathParts = location.pathname.split('/').filter(Boolean);
  const page = pathParts.length > 1 ? pathParts[pathParts.length - 1] : 'home';

  return (
    <BusinessContext.Provider value={business}>
      <SiteComponent business={business} page={page} />
    </BusinessContext.Provider>
  );
}
