const PRODUCTS = {
  HOME_PAGE: 'homepage',
  EVENTS_PAGE: 'events',
  EVENT_PAGE: 'event',
  COURSES_PAGE: 'courses',
  NEOVARSITY_PAGE: 'neovarsity_homepage',
  ACADEMY_PAGE: 'academy_homepage',
  DATASCIENCE_PAGE: 'data_science_homepage',
  MENTEE_DASHBOARD_PAGE: 'learner_dashboard',
  TEST_PAGE: 'scaler_enrolment',
  REVIEW_PAGE: 'review_homepage',
  CRT_PAGE: 'career_roadmap_tool',
  MEETINGS_PAGE: 'meetings',
  DEVOPS_PAGE: 'devops_homepage',
};

export function getProduct(url: string) {
  const urlPathArrs = url.split('/');
  if (urlPathArrs.includes('events')) {
    return PRODUCTS.EVENTS_PAGE;
  } else if (urlPathArrs.includes('event')) {
    return PRODUCTS.EVENT_PAGE;
  } else if (urlPathArrs.includes('courses')) {
    return PRODUCTS.COURSES_PAGE;
  } else if (urlPathArrs.includes('career-plan')) {
    return PRODUCTS.CRT_PAGE;
  } else if (urlPathArrs.includes('meetings')) {
    return PRODUCTS.MEETINGS_PAGE;
  } else if (
    (
      urlPathArrs.includes('academy')
      || urlPathArrs.includes('data-science-course')
    )
    && urlPathArrs.includes('test')) {
    return PRODUCTS.TEST_PAGE;
  } else if (urlPathArrs.includes('mentee-dashboard')) {
    return PRODUCTS.MENTEE_DASHBOARD_PAGE;
  } else if (urlPathArrs.includes('academy')) {
    return PRODUCTS.ACADEMY_PAGE;
  } else if (urlPathArrs.includes(('data-science-course'))) {
    return PRODUCTS.DATASCIENCE_PAGE;
  } else if (urlPathArrs.includes('neovarsity')) {
    return PRODUCTS.NEOVARSITY_PAGE;
  } else if (urlPathArrs.includes('review')) {
    return PRODUCTS.REVIEW_PAGE;
  } else if (urlPathArrs.every(ele => ele === '')) {
    return PRODUCTS.HOME_PAGE;
  } else if (urlPathArrs.includes('devops-course')) {
    return PRODUCTS.DEVOPS_PAGE;
  }

  return PRODUCTS.HOME_PAGE;
}
