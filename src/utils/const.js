export const shortcutsTranslation = [
  { label: 'giorno', value: 'day', isSelected: false },
  { label: 'Yesterday', value: '-day', isSelected: false },
  { label: 'questa settimana', value: 'week', isSelected: true },
  { label: 'Last Week', value: '-week', isSelected: false },
  { label: 'This iso Week', value: 'isoWeek', isSelected: true },
  { label: 'Last iso Week', value: '-isoWeek', isSelected: false },
  { label: 'This Month', value: 'month', isSelected: false },
  { label: 'Last Month', value: '-month', isSelected: false },
  { label: 'This Month', value: 'year', isSelected: false },
  { label: 'Last Month', value: '-year', isSelected: false },
  { label: 'Last 5 days', value: 5, isSelected: false }
]

export const pickerFormat = 'dd/MM/yyyy'

export const defaultDateTimeFormat = `${pickerFormat} HH:mm`

export const operatorOptions = [
  { label: 'Compreso', value: 'Between' },
  { label: 'Uguale', value: 'Equal' },
  { label: 'Non compreso', value: 'NotBetween' },
  { label: 'Diverso', value: 'NotEqual' },
  { label: 'Minore di', value: 'LessThan' },
  { label: 'Maggiore di', value: 'GreaterThan' }
]

export const fieldTargetOptions = [
  { label: 'Memoria Interna Corrente', value: 'Internal_memory_current' },
  // valori che non esistono piu, visualizzo label vuota
  { label: '', value: 'Time_sync_numeric' }
]

export const presetOptions = [
  {
    label: 'Sincronizzazione GPS',
    value: 'Preset-GPS_Status',
    description: 'GPS non sincronizzato',
    requiresThresholdValue: false
  }

]
