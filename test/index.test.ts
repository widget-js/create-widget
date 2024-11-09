import path from 'node:path'
import { expect, it } from 'vitest'
import { minimatch } from 'minimatch'
import gradient from 'gradient-string'

it('minimatch', () => {
  const fileName = path.basename(
    'C:\\Users\\rtuge\\Desktop\\github\\widgetjs\\packages\\@widget-js\\cli\\template\\Widget.ejs',
  )
  expect(minimatch(fileName, '*.ejs')).toBeTruthy()
  expect(minimatch(fileName, '*.ts')).toBeFalsy()
})

it('gradient brand', () => {
  console.log(
    gradient([
      { color: '#42d392', pos: 0 },
      { color: '#42d392', pos: 0.1 },
      { color: '#647eff', pos: 1 },
    ])('Widget.js - The Desktop Widget Framework'),
  )
  console.log(
    gradient([
      { color: '#42d392', pos: 0 },
      { color: '#42d392', pos: 0.1 },
      { color: '#647eff', pos: 1 },
    ])('Widget.js - The Desktop Widget Framework'),
  )
})
