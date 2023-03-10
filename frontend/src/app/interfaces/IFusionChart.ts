export interface IDadosFusionChartScrollColumn2D {
  chart: {
    decimals?: number,
    caption: string,
    yAxisName: string,
    xAxisName: string,
    subCaption?: string,
    numberPrefix?: string,
    numberSuffix?: string,
    formatNumber?: string,
    rotatelabels: string,
    rotateValues?: string,
    setadaptiveymin?: string,
    labeldisplay?: string,
    theme?: string,
    numvisibleplot?: number,
    scrollPosition?: string,
    scrollPadding?: string,
    plotToolText?: string,
    showValues?: boolean,
    forceDecimals?: string,
    decimalSeparator?: string,
    thousandSeparator?: string,
    exportEnabled?: number,
    exportFormats?: string,
    exportFileName?: string,
    exportMode?: string,
    exportShowMenuItem?: string,
    palettecolors: string,
    labelFontSize?: number
  },
  data?: {
    label: string,
    value: number
  }[],
  categories?: {
    category: {
      label: string
    }[]
  }[],
  dataset?: {
    data: {
      value: number, 
      consumo?: string, 
      tooltext?: string, 
      displayValue?: string, 
      color?: string}[], 
      seriesname: string
    }[]
  }