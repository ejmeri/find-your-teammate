enum DEFAULT_PERMISSIONS {
  CREATE = 'Criar',
  VIEW = 'Visualizar',
  EDIT = 'Editar',
  LIST = 'Listar',
  INACTIVE = 'Inativar',
}

export class AllowPermissions {
  public segments: Array<string> = [];
  public sectors: Array<string> = [];
  public departments: Array<string> = [];
  public teachers: Array<string> = [];
  public employees: Array<string> = [];
  public employeesRoles: Array<string> = [];
  public companies: Array<string> = [];
  public collaborators: Array<string> = [];
  public companyPlannings: Array<string> = [];
  public companyTeams: Array<string> = [];
  public realizationClasses: Array<string> = [];
  public companyQuestionnaires: Array<string> = [];
  public companyQuestionnaireAllocations: Array<string> = [];
  public companyQuestionnaireAnswers: Array<string> = [];

  public plannings: Array<string> = [];
  public classes: Array<string> = [];
  public exercises: Array<string> = [];
  public planningSettingsEmphases: Array<string> = [];
  public planningSettingsObjectives: Array<string> = [];
  public planningSettingsRegions: Array<string> = [];
  public planningSettingsJoints: Array<string> = [];
  public planningSettingsMuscles: Array<string> = [];
  public planningSettingsMaterials: Array<string> = [];

  constructor() {}

  static createFromAcl(acl: any): AllowPermissions {
    const acls = new AllowPermissions();

    acls.segments = acl.segments || [];
    acls.sectors = acl.sectors || [];
    acls.departments = acl.departments || [];
    acls.teachers = acl.teachers || [];
    acls.plannings = acl.plannnings || [];
    acls.classes = acl.classes || [];
    acls.exercises = acl.exercises || [];
    acls.planningSettingsEmphases = acl.planningSettingsEmphases || [];
    acls.planningSettingsObjectives = acl.planningSettingsObjectives || [];
    acls.planningSettingsRegions = acl.planningSettingsRegions || [];
    acls.planningSettingsJoints = acl.planningSettingsJoints || [];
    acls.planningSettingsMuscles = acl.planningSettingsMuscles || [];
    acls.planningSettingsMaterials = acl.planningSettingsMaterials || [];

    acls.employees = acl.employees || [];
    acls.employeesRoles = acl.employeesRoles || [];
    acls.companies = acl.companies || [];
    acls.collaborators = acl.collaborators || [];
    acls.companyPlannings = acl.companyPlannings || [];
    acls.companyTeams = acl.companyTeams || [];
    acls.realizationClasses = acl.realizationClasses || [];
    acls.companyQuestionnaires = acl.companyQuestionnaires || [];
    acls.companyQuestionnaireAllocations = acl.companyQuestionnaireAllocations || [];
    acls.companyQuestionnaireAnswers = acl.companyQuestionnaireAnswers || [];

    return acls;
  }

  get COMPANIES_LIST(): boolean {
    return this.companies.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANIES_VIEW(): boolean {
    return this.companies.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANIES_EDIT(): boolean {
    return this.companies.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get COMPANIES_CREATE(): boolean {
    return this.companies.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get COLLABORATORS_LIST(): boolean {
    return this.collaborators.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COLLABORATORS_VIEW(): boolean {
    return this.collaborators.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COLLABORATORS_EDIT(): boolean {
    return this.collaborators.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get COLLABORATORS_CREATE(): boolean {
    return this.collaborators.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get COMPANY_PLANNINGS_LIST(): boolean {
    return this.companyPlannings.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_PLANNINGS_VIEW(): boolean {
    return this.companyPlannings.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANY_PLANNINGS_ALLOCATION(): boolean {
    return this.companyPlannings.indexOf('Alocar') >= 0;
  }

  get COMPANY_PLANNINGS_ADD_TEAM(): boolean {
    return this.companyPlannings.indexOf('Adicionar Turma') >= 0;
  }

  get COMPANY_TEAMS_LIST(): boolean {
    return this.companyTeams.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_TEAMS_VIEW(): boolean {
    return this.companyTeams.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANY_TEAMS_EDIT(): boolean {
    return this.companyTeams.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get COMPANY_TEAMS_CREATE(): boolean {
    return this.companyTeams.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get COMPANY_TEAMS_ADD_COLLABORATOR(): boolean {
    return this.companyTeams.indexOf('Adicionar Colaborador') >= 0;
  }

  get COMPANY_TEAMS_REMOVE_COLLABORATOR(): boolean {
    return this.companyTeams.indexOf('Remover Colaborador') >= 0;
  }

  get COMPANY_TEAMS_CLASSES_LIST(): boolean {
    return this.realizationClasses.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_TEAMS_CLASSES_VIEW(): boolean {
    return this.realizationClasses.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANY_TEAMS_CLASSES_START(): boolean {
    return this.realizationClasses.indexOf('Iniciar Aula') >= 0;
  }

  get COMPANY_TEAMS_CLASSES_FINISH(): boolean {
    return this.realizationClasses.indexOf('Finalizar Aula') >= 0;
  }

  get COMPANY_TEAMS_CLASSES_SAVE_REGISER(): boolean {
    return this.realizationClasses.indexOf('Salvar Chamada') >= 0;
  }

  get COMPANY_TEAMS_CLASSES_ADD_COLLABORATOR_REGISTER(): boolean {
    return this.realizationClasses.indexOf('Adicionar Colaborador na Chamada') >= 0;
  }

  get COMPANY_QUESTIONNAIRES_LIST(): boolean {
    return this.companyQuestionnaires.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_VIEW(): boolean {
    return this.companyQuestionnaires.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ALLOCATION_LIST(): boolean {
    return this.companyQuestionnaireAllocations.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ALLOCATION_VIEW(): boolean {
    return this.companyQuestionnaireAllocations.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ALLOCATION_EDIT(): boolean {
    return this.companyQuestionnaireAllocations.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ALLOCATION_VIEW_ANSWERS(): boolean {
    return this.companyQuestionnaireAllocations.indexOf('Visualizar Respostas da Atribuição') >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ANSWERS_LIST(): boolean {
    return this.companyQuestionnaires.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get COMPANY_QUESTIONNAIRES_ANSWERS_VIEW(): boolean {
    return this.companyQuestionnaires.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get SEGMENTS_LIST(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get SEGMENTS_VIEW(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get SEGMENTS_CREATE(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get SEGMENTS_EDIT(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get SECTORS_LIST(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get SECTORS_VIEW(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get SECTORS_CREATE(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get SECTORS_EDIT(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get DEPARTMENTS_LIST(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get DEPARTMENTS_VIEW(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get DEPARTMENTS_CREATE(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get DEPARTMENTS_EDIT(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get TEACHERS_LIST(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get TEACHERS_VIEW(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get TEACHERS_CREATE(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get TEACHERS_EDIT(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get EMPLOYEES_LIST(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get EMPLOYEES_VIEW(): boolean {
    return this.teachers.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get EMPLOYEES_CREATE(): boolean {
    return this.employees.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get EMPLOYEES_EDIT(): boolean {
    return this.employees.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get EMPLOYEES_ROLES_LIST(): boolean {
    return this.employeesRoles.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get EMPLOYEES_ROLES_VIEW(): boolean {
    return this.employeesRoles.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get EMPLOYEES_ROLES_CREATE(): boolean {
    return this.employeesRoles.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get EMPLOYEES_ROLES_INACTIVE(): boolean {
    return this.employeesRoles.indexOf(DEFAULT_PERMISSIONS.INACTIVE) >= 0;
  }

  get EMPLOYEES_ROLES_EDIT(): boolean {
    return this.employeesRoles.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNINGS_LIST(): boolean {
    return this.plannings.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNINGS_VIEW(): boolean {
    return this.plannings.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNINGS_CREATE(): boolean {
    return this.plannings.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNINGS_EDIT(): boolean {
    return this.plannings.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get CLASSES_LIST(): boolean {
    return this.classes.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get CLASSES_VIEW(): boolean {
    return this.classes.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get CLASSES_CREATE(): boolean {
    return this.classes.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get CLASSES_EDIT(): boolean {
    return this.classes.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get EXERCISES_LIST(): boolean {
    return this.exercises.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get EXERCISES_VIEW(): boolean {
    return this.exercises.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get EXERCISES_CREATE(): boolean {
    return this.exercises.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get EXERCISES_EDIT(): boolean {
    return this.exercises.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_EMPHASES_LIST(): boolean {
    return this.planningSettingsEmphases.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_EMPHASES_VIEW(): boolean {
    return this.planningSettingsEmphases.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_EMPHASES_CREATE(): boolean {
    return this.planningSettingsEmphases.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_EMPHASES_EDIT(): boolean {
    return this.planningSettingsEmphases.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_OBJECTIVES_LIST(): boolean {
    return this.planningSettingsObjectives.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_OBJECTIVES_VIEW(): boolean {
    return this.planningSettingsObjectives.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_OBJECTIVES_CREATE(): boolean {
    return this.planningSettingsObjectives.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_OBJECTIVES_EDIT(): boolean {
    return this.planningSettingsObjectives.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_REGIONS_LIST(): boolean {
    return this.planningSettingsRegions.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_REGIONS_VIEW(): boolean {
    return this.planningSettingsRegions.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_REGIONS_CREATE(): boolean {
    return this.planningSettingsRegions.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_REGIONS_EDIT(): boolean {
    return this.planningSettingsRegions.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_JOINTS_LIST(): boolean {
    return this.planningSettingsJoints.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_JOINTS_VIEW(): boolean {
    return this.planningSettingsJoints.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_JOINTS_CREATE(): boolean {
    return this.planningSettingsJoints.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_JOINTS_EDIT(): boolean {
    return this.planningSettingsJoints.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_MUSCLES_LIST(): boolean {
    return this.planningSettingsMuscles.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_MUSCLES_VIEW(): boolean {
    return this.planningSettingsMuscles.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_MUSCLES_CREATE(): boolean {
    return this.planningSettingsMuscles.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_MUSCLES_EDIT(): boolean {
    return this.planningSettingsMuscles.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }

  get PLANNING_SETTINGS_MATERIALS_LIST(): boolean {
    return this.planningSettingsMaterials.indexOf(DEFAULT_PERMISSIONS.LIST) >= 0;
  }

  get PLANNING_SETTINGS_MATERIALS_VIEW(): boolean {
    return this.planningSettingsMaterials.indexOf(DEFAULT_PERMISSIONS.VIEW) >= 0;
  }

  get PLANNING_SETTINGS_MATERIALS_CREATE(): boolean {
    return this.planningSettingsMaterials.indexOf(DEFAULT_PERMISSIONS.CREATE) >= 0;
  }

  get PLANNING_SETTINGS_MATERIALS_EDIT(): boolean {
    return this.planningSettingsMaterials.indexOf(DEFAULT_PERMISSIONS.EDIT) >= 0;
  }
}
