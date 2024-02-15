import React from 'react';
import { Tooltip, Chip ,IconButton,Avatar} from '@mui/material';
import '../features/events/weather.css';

const wind='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFElEQVR4nO2Za6hVRRTHf6beLoiFWZL28BFEUlSYKJRCRGQmlBXFJaESIulBkOWrF9oXg0qIIrIPlRaUlilWgg/soVBilhUVRqKVqaio9DLT68SCdWHY7Jk153ROV8/sP6wve/Zae+a/16w1aw1UqFChQoUKFRQnAzOBr4E/gK+AaUAbGaAN+AhwJbIa6E2L45HA4rvkYVoc3xoEyHZoaew3CNhNi+N7g4DNZB4DHiKDLPBhYPGrgF6F908BLgVOpcXOAdMKi58eSIEnAWv1nX3ARmAR8BRwN3A1cN6Jmj6dJ/KnQzgL2GtsHacB9nNgcYGgYUAPjkM4T04PvDMAaAduSCAgJr9pil0KzAPuB64Dhqv9boHzZFDJ+AjgZ52s4OX/SEJIjgG/AuuABcBs4HZgjHpf07zHeTKkMNYB/KljPwE9gf7A700iISaHNH1/ADwPTAUmApcAfRtFwPle0Jurf8Ufn6DjzxiT/QUYD0wGngBeBJZr8NwJdDaBoD3ABuBN4FHgtHoIuEhT3fuBj9ynOhckuPOZkW/2UrceBcxqksdIML6xVgI6gO8C7if70ccWYwJiKwXtGhxDdmTsSuA2dft5+pclVvyocwvpHgGuqYWAIyVGJDCNLtGztsELpOMtw5YQEMPYyLbaAfRJJaAonwUyg+AmQ3dNDQRMNmxJ0LOwPKI/pR4CXjNy83Bj0ltrIOAyw5YENwsdEX3JHMkEHNW9ZqF/QhBKxRmGLTmBWhgS0ZdtHIT/4j/AuMRJ9zYmLfGEBtmSeVloj+j/HVMsvvyeURN0oY8xaTlApaKvYUsOXhb6RfQPxhTLFOS8PtT44KAGdpXONWxtS7AxMqIvLcCaCOjad7H0c0UDu0rjDFvRIJbQ5HmpHgK69t69Ab0phu47NRDwuGHrwYQGz/aIftk5ppSAXREGixcm7xqTfqwGAjYZx+pzSsrzi7U2uQt4PaL/tvVx58lULSQ6A60yP+JaFaGUsSkYXFJ0FY/Csoj1+pcPG9/15YuUNp7zZIY+u77kfC57DG/cygC+x7RpoLscuBl4QLtFC4Eva1hQqsjWfS61THYBt71Qiw2nDVS/3/eJMYEDWlFu1mzgmiCd2qiRK75XNY5MUpIlJSbDefJkYUxq6vkFg1c1aUGh/C1uvAR4GrgHuFb7Fg27xHWeiFvGIC71Q4NddateyM7X2+pbNafLUft/gfPkWePdhXUsMtYlLt4/dAtcYtl5Z2CBhwt/UQLpLVrhnRAXKc4TWUAZBgIr1QPmAHdoE+Ls47XXXy8Br5AhnCdvkDkBi8mcgGVkTsAKMidgDZkT8DGZE/ApmROwicwJ+IbMCdhC5gRsI3MCdpA5AXvIEK7QgsqagL/InICj3T2ZChUqVKhQgabgX91lduHTgQ3vAAAAAElFTkSuQmCC';
const humidity='data:image/png;base64,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';
const smoke = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWElEQVR4nOWUWytEURiGH8WdlJFSyuF2lJBfIadkkks/wMQFfsnc+wNCyYWSMk1SyulerhwuDZJx2Fr17lrtvr2HWbnhra++9a1vvc/aa68W/BdNAwfAk2IfGGvUbADYBKqKEyBKiTJwB9wAG0D+O+bVDMOoTjzUg2wHmEeKrSxAyO4j7ytS9fjbgMOURa/AEtCuWFbN6t1LM58BPjzDFaAX6ABGjX5XyylWgZrWvgOTFuDM24Uzt3QMHKXMrXnrT62GF6+hU7WK7nqTxvE8qlUUTn3e/LMFuPAaulW71njYAIwodz3o/sfz5xZgDvhUw7hq6xoXDUBRuetB5x7Jw3mZmtX5LSRMSgagpHxR43n9xwI/0JRMdgzArvIJAjSUOFMfcKl8MATQL5MrAxBfgJ4QQJdMbg3AfeJKN6S2xPviA+KHsTUE0CKTmgF4U95MoMp6BLPyP6wvXRbIwdx/FvQAAAAASUVORK5CYII=";
const temp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMUlEQVR4nO1bTWhcVRS+tT80M/f7zn0zSWiSppo0TZo0/bPRVtTa+rPShV10p7hQEATRTcFNFbsQqSAFoZsIUkwQBFGUWlGDPwU3KrUUKxYUUUHQXdtJWqW9ct68N30T2zSRTmbezPvgbObN3Mn5zs/97uQeY2oI59wmkodIOU7yC0BeIrnWtACWAjhMsiQi/4iIF3FeRP4mZdo5tz/5ZkCeBfgrKV9Za4cTj1aSfAHgbwCnYyPlDMmnjDE3mUYEgMMAzzvn/GxTMvQZIPui9w6qgyQHSD4NyMfRMisBfG0tzuVyOd/W1laxfD7v9XWA7xhjlphGgiunfSnpdE/Pat/d3VNFBCmlXC7XBWAHwJMaTRHZBfBbXYfk8+pk7LSSUCbiChkAz4nIXtNIIHlI0z52tLd3jZ+YmPDj4+O+q6u7igAAz6jjJN8D+DMpf1krD0fr/JLL5UNHrcV5LRFreQbgH9bakJh83nqSn5pGAinHNc3jyKvzMzMzoR08+Irv6OhIkvBm9LElAIZIFuJ1AJbKkc5ppH9PfMUyLaE4IwCcMo0EgCeS0Z+amqoQMDk5GZIS9wJS3p9jnZk49QH5KfnMWr6qBGlDtJZPmnpBRLZpDapFqbtsMQiIvnuLZo2pJwDZB8jbkU1qCi8WAQ0LZAQwywBX+xJYAeBRa2VP3YUQgIcWuwkCfBdAyVqUAHnZ1BHLSR6pURM8f4UA/qlR19eDIBCAF2JJDPB700jAjSPgh/gMEOn+i9Fh6KK1djoi4LJmg2lGAqyVJ6zF2ZiE2Qei6CxQstbdY5qRAFOWx5NaCprqsfTV80E+bzXyepZ40dQTUkMlGEPXtRbHtCSiw9BpPQZb6+429QZqqARTC2QEMMsA10olgBopwbRgea2UYGqBjABmGeBapQRkEZRgQwPXUYLFYoffff+Dfs/ex0K74657faHY3jwEXA1JApwr+MHR2/2m2+4Lbe3QFu+CQkaAyzLAtYYSdC1QAsvnUoKtQMB/kBGALANOtEwJyHWUYNMTgOsowaYn4GrICECWASeyEnAt3ANInlwAAUdNE2GFtXxD/2cXX5ObBwHTen+4Ya+8LgArSPl89g3RkIANCQLWb/XOBeG94St3BfXaLN5KNQnW8kjS+XIGFHzX6n6/cWx3hYDRbbv8qu6bvYQkSBUJInLApBEkH0hejBYJvAuKfmh0e8Xx2bZuZCwkSLMhUQ5K4GaTNpDyY5zS6kgQFP2GrTuv6Xxsw5vvjEiofPYS6T4zaQLJMVLOJet+rsjPtoHhWxNZEN4dni4UCqtNWgDggA5BxNHv6OyZt/OxFYodlX5Ayllr5XGTFpCcqkQ/CHz/4KYFE9DbN1zZFaJhitdNWkDK6ao9P7Hlzdf6E9pADZBjJi0g+V0cvSBQAuZf/1cTR1EZfGjSAlKOVjIgKPi+dZsXTMCavvXlrTNqhADHTVpAcr+IXIjrt3NV7/9ogp2VHqBNEMAjJi3I54NRHVxKiqChjTvmn/7rdRusSv9pHaQyaQIpp0TkcuxEELTPXwgFhcoWKOIukfKBSRusdTtnS2FVg4NzCKKB4bFQLicFlEpha+2ISSMQTolKggQXHnjaO7v8LQMb/cDwttDpNf0jvti+KtQM1SdCHaErD1KmFUtF5JMkCTERWuOaEbpNVh+Vq+YHD5smmRd+rfyDiKv0hGtZVPMlMniu7lMfNxIAtgPyjXb0aFDaJ4anw4hHvwR9pLuIaVaISJ9Ohet0KClfRuPzEzoHEARBb73/vhj/Anb80whzrmuNAAAAAElFTkSuQmCC";
const compass="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB8UlEQVR4nO2WuUpDQRSGP7S0FdwRLYxY+BR2Lq2inZXRiBLwQaxcsFMbVwSNhY8gglXEd1DQaKGJMXLgvzBcvMnMNXb5YCBk5qxzzpkLLVqEMQDkgGvgAXjXst8FYAXo5x/oA3aAClBrsKrAETDYLOMzQEnKP6R8FhhxjGaAOeAE+NR/JjP9V+OrisgUHusKGmGRnzrZsCtLHXkV+ALWUsjnJV9Nk4k+J+3rKYx3qBjz0vEK9IQo2JOg3WkIbcAicCsnjHPpsiL2YkBp/wis5AngXsbMiYghFWZFmfUqvJqKzoeMOiPqCHOiPXbmTHvLPgoLOmxtVY8uYOuX2WCZiDOvvUsfBx6d3q5n/AnY1/qWzFXC+VHt28RsSMmJJoktGY44UCbGEs5H+krNcGBMxuIOmFM0w4HHBldwpf1vGT4EnnUtNOMKCnWKcCJWcBVFXs+4sRBShCsJbWhD5s4xfgOM+yh0htGSz+F+RfYZG0SLTp//1mpJDAPlkEFk7MqYvWporN7KCctECBfStR0i1Ot0Q15ZiWZ7CBvS8QJ0hwpPO89pPqXxSH6SlOScD5JzPSw+dx6lvaqi/hNTes9rKswzzfaot2v6vSAny07aU0cepxPY9PworejtD/oA8cXaKKtpWATetIoaMtmQVmvRwvgBEDW49iMXs30AAAAASUVORK5CYII=";
const smsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO2Wu0oEQRBFTyiigcL6+ALxEbmZgqaKmaipifgbvvA3/BBNBDEQUcFMQ9fABdFVd42UkoZSirV3nJ7pmUD2wk2aun3o6scMxNUosA9cA+9AC7gAdoERCtIa8AJIBz9rTVStAJ8JUFG7mtVY0EHgMQVU1K4rwzHA23+AHoBpYNaM7cUAnyVA68Ck1lXN+FUMcMtMOKOAunpKayZ05d91b3aCJeA+YK/6NfdqxlxLUWAnqLSDawFQ5zHNXbbtpwORABXN/EgCvaG5Hc9hqqp9UNFMZvCh5oaARkCuAVTygJ3nAh+QD60lL/gGGDDwpCfzCVj2XQvJ6GMDr+gHwR2epl61c2Ar6bWSHL4F5skoieAjYBMYB/qAnrLA4nEX/EvdVsu/P1y1AqB3acCLkeEOupAG7JOdqGn+nwqXGK+XBcVADyhZJ8Ap0Fs2uDB9AWkG0AT7/d55AAAAAElFTkSuQmCC";
const notsmsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdElEQVR4nO2YsWsUQRTGf4rFqQjGMkogjYKcvYmCisa/ILE2GiwsbGxUIoildlFrQTQGovEPEAQ7E9BCUWOwO1NcE0WDhTkcefAWluFud3ZvdncO94Ovmbl5+31zb97OW6jx/2IImAGWgDVgU7mmYxf1N8FhJzAL/ABMCr8DN4AGgWAYWHYQbiy+A0aqFr8f+JZDvFG2dAMqS5uVPsQb5XLWdDoOLADrQCfHA09pnJvW+CQwDrQT1srcGDBljcuZSMUO4EGfu/VeY+3rcmBFmKDZw0Rb51Cj9sFOrU79ihfe1lgzKQKblomkuYjTaWljPPC0xnuRkCJNS6iLeOGzJANPPRmIyt7XlDxvxgS7iBd+STKw7slAVC02U37Xjgl3ES/8lWQgT7Xpxl0FGviZZMB44oGqUsh44lmNt1TAIV4sw8Ctqsqo8cSPGm+ozxfZmDW3Aewtw4DwhMactcanHK8S48A5a/x6knjfBt4A27WkrniK1yjTgPBy7DrdKuM6bTzzT+xaMay7mDXG2ywNjSmAGzETDb0Sy63SZd21WNqcrMqAcAu4AmzT50gluQA8B1ZjTf2qXtamY9VG1lzVGJUZiPhBq5Arzlh9dOUGIspO3wEmgEN6d9oDHNS3+F3gU5d1wRjIy9qAqf8Bik2hTgB5bnpQtKXCV0tZBFsuBnw19UXwsYuBo8DfAMSaLjyGI+4FINZYnCMD5NPi/QBEG82GOdWUGdIRzevhKbM6dfSZT2LtpzdkFfMbuERAMBn4GThCYDCOfATsJkCYQUsZGwOXMja2eoh/GGrK2HhtCZc+9jwDhFHgpX6jfwUcrlpQjRrkxz9N+6QOXaY1tgAAAABJRU5ErkJggg==";
const fireIconUrl= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdklEQVR4nO2WPShGURjHf68o8Q5KSspX2ZSV4R3ekoxWRqNiNBnEZLaYDWJ4IxYDg5TBx/zGoDCwiMhnyauT59bp5H4817nvIP/6L+ee8//dzj3nuQ/8K14HwCGQp4pqBCritWqCByyw8US1wEsO+AFoyxraAjw7YOOVrMHLP0AD92cFHQI+I8AbWUCbgMsIqPEH0OobvBoDDTwl83PADrAH1KSFjiSEGpdkTcEaM59IrTxwowCfy7rt3574WQXU+AmYc8bugToNtEGKQ8WDixrwmCeo8YwGXPII3tKALyKCroFxBfhMA34NCbkFuoFhBfhRA76LKRJ9ytOeWCchIe1WdTpS3u9Emg8JMR1IoF65p3HgzWTIb3UCbwl+fwXZyijwpAaM3D83xHQgrgYjDqNpHJq14FrZJjvoXQ6Wq9EQ8AIpVQ+sO2Gn0ga5cueVpfSmVg6YBl6sUNNXuypaz6+ADjypC1iUyrUf8oK7wDHQ4wvKn9EXpY8rBEsOB3YAAAAASUVORK5CYII=";
const nasaUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHnUlEQVR4nO1Ze1BU5xXfmXb6R9P+0Zn+1T8zTWQXuHeXvfeyizyG2qYzysMqGojGaMwEHxAQsYnWBwQySUuDonvv+uCh02phY+IT0KSgiDFSBaNIjImCkV3EB6FKIoE08+ucb2Fdll323pU2+YMzcwbud7/vnt/5zuM731mdboqmaIqmiCjcaOcNnJxn4BSHnlcu6nnlSz0nDzN2//8xvTPwtlU0V/dDoGnTyn9u4JTVek75xMAr0MJ6Tu5gChtsP/u/A09I2PRj2kk9L/dpAS3FlI8f55R7YbySS99UK/+WVYgIGXxExI4wPadc0LrjxFm5dRO8l9umRSrTgsnvjRWedFqF9JDAGyKVFD2vDGgFHj29nIHv6Ohlf+k5gBIPwjk5OZB8l9n8S5dFOHOL457QDF7PKc/rOeXbUHZenQWUkdhQvtXz8kJf+V/EmH7lsoqXnFYhP7SdDxF8w4nrE8cA71+JcE5JGpXvFMWnnVahy2URP71sMPxE284b7U+RaX2FhBsV/HHt+1j5Si0yVxzByyuOYEV2LcyWXSFbyOCtBK8MULz1xIiC0yLcdlrF71wxUpwm8JQZAgUsAY+OrRgzFmmy46Vlh5kyk6HEy+ZXP3daxAGXVYTTIryl00qUKgN9PHvVWH/2dg9LXAXyXz2O6QmVIQEXjVtgE17ATasEAu+yCI1ISFCdZhlxXMkTBk6+G0gIuUuwAKWxZ2b9TTXwcF5GjjkPHZY4N3CriNboxP/sFZ57Uvvuc8rqiYRl5dSqSpHkUqlp1UHBp0dtwvvRSR7gxJct8Zhhegt0YmtWIFh5MKrARBYY5ReWHsTM1L1+36WainBQmj0GODFZIS2qYCQryR3aC7MgOxYoBrzTpq/Cic/s8TynmQrgkObCOeLnnVYrysXnoIiLcM0agyRT8Zj1YZwSMWnuQ7ws6yhM0g5NwbnmtePItGzAkehUz063WGagUFgOK1+KYvMy1EnJiDGWjlurj5RztCjgCAaGfH1p5mFVwCXjFmwwr8T52N+jr6gQVy3TsVNciGejNrH3UfxW7JXmo1R4EZG8HOg71eoV4JVLowsF6y4crbuKU6e70HjiOqzx7ty/TT6LumNXPQISZuxGbf1VfHyxB479lz1uQm7Rk52Nh599hsGBr3DHdQ9nPrqBwqKTbM4fTK+jfvoc7LcdZ2vbLrg8MsZYgFMuaLHAPe/FFy/1YHh4mHHNO+1szL7jX3Dsbx8TnF03+tzzhoZwKX0Jy+NHpRT0dvWy8YKiE5j7rAOVe1pRUnIKheYVTMFo42ZU7WnzyCgp/XC8BTj5rmoF9Lw85KtAf//X7ONDQ8NYtOQAU4CYDiwCUDL/z/i6rx+Dd+6weadqmmHhN7P1t+88YGO3bt1nQW4rOIRTG21YaFrvkdHZ2YdPrtxm87q7+xEZtd1XiW8eS4HiN5vw8OE3TMDn1+5i3+4WfLCrHo0ZObi+cDHabPvwwd+bUL7rLJvz4MFDjyu8/sZJDA661w7UHkH/lrfRcKwDc+bXuFPp3Gqc/vAGq6lGrZC7uj50Bfy50KIXD6C6yg2OeLCvD63l72Fx1DqsXXec+S7tore7lbz9yBVmx5fhUPJyNNkPeiy5vqCRvSstO4Ourj40n+5i4/T+3Pnu0F3IO4gpK3S230BL5mtoSUxC3023PxOTC9GclDn/wJf9XyEnr57xlU/drnCzux9clB0N68pQlZKP+PidLAboXU/PvzEzZS/S0h1obXPizb80s7XvHujwfH9exjshB7FDMJZhvZCFc4kpuNl8Hpvz3MFKlSZlC+LyylZWVm8oaMTJpk4kzd7H5hQWn2RZ66PDLTg4MxONyiH2TKB7b99HU3MXZqW655aUnmZrSRl6JreiucRltrPa06jLbP6pQ5pbfzb6d1hvXgmRL1N9UP1pYwM483ZE8DLyzbnYKi6Gid864ZqlmYf9XnR8x/Sc8kpQ8E6rNM9pEa+ckX5bZjRu03TKsgMpeif+WlCLCnEBK87UrDFJO9ip7jvuW1vpeVu4ahdibsTL7aOLA9U33kyxQiXB9uQ1qKw853ERNZztVVf5q241F3NMAWo6qQQwy/QGaqQ0ZERtdLvFskP4Z8M11QpkBbhLPHq2rdKsQKALjbc16AJSLGRit5TBblFaXc4QoDQfEwOU0kPt3lHHLJBQCu4qKYPdoCYCR/dmylQTzVme/SgGxrkrJ2frHq+FKLf5CkwxFWGPmI4EY0nQ3Y2Jr8TGwkbE/aZKVQwYxvJ53TzHj3SPQwaT7dcGTrk/+tElUWuxXXwevJ8sFajvQxagTEP3aN87hCWuYtz92rutopsMonYfNZtWmvMZePJ9tcHozVSa026TMnQgZuXWIW/NsXEuRrLCeHmWbjKpQlpg3yks+M4fePW9z+CsZx1A+4JJBd8dIyU6rcJ7Jk5O9telU2uBoMwp9yd954mcFrH9i9jYX9D/Ydy2pw280uoPgNreZ6CA1RvtT+n+F+SySrPHtRwj5Rzfsju0XZfvslT5uNkmFKIDZuR3scvawVOpYlv1vfzE5I+o2HJbRa6h2p1+fqKbHbvdccq9kSZxNZtjtBu+b7xTNEVTpPth0H8BVcAkVeXZx0MAAAAASUVORK5CYII=";


function LiveWeather(props){
  const windDirections = [
    'North', 'North-Northeast', 'Northeast', 'East-Northeast',
    'East', 'East-Southeast', 'Southeast', 'South-Southeast',
    'South', 'South-Southwest', 'Southwest', 'West-Southwest',
    'West', 'West-Northwest', 'Northwest', 'North-Northwest'
  ];
    
    let weather_data=props.data.weather_data;
    let species=props.data.species;
    let img=props.data.thumbnail;
    img= img.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    const camera=props.data.camera_name;
    let name=camera;
    if(camera.includes('PTZ')){
     let nameC=camera.split('-');
      name=nameC[1];
      console.log('name: '+name);
    }
    const date=props.data.date;
    const sms_sent=props.data.sms_sent;
    const nasa=props.data.nasa_tag;
    let file=props.data.file;
    file=file.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    // Calculate the index in the array based on wind degree

  let index ;
  let windDirection;
  let celsius;
  let Temperature;
  let text;
  let description;
  let icon;
  if(weather_data ){
    index = Math.floor((weather_data.data[0].wind_deg / 22.5) + 0.5) % 16;
    windDirection = windDirections[index];
    celsius = weather_data.data[0].temp - 273.15;
    Temperature =Math.round(celsius);
    //feelsTemp=Math.round(weather_data.data[0].feels_like - 273.15)
    icon=weather_data.data[0].weather[0].icon;
    text=weather_data.data[0].weather[0].description
    description= text.charAt(0).toUpperCase() + text.slice(1);
  }
    if (!weather_data || weather_data.length === 0) {
        // Handle the case when weather_data is empty or undefined
        return (<>
          <div id="m-booked-custom-widget-35390">
<div className="weather-customize" style={{width:'100%'}}>
    <div className="booked-weather-custom-160 color-009fde" style={{width:'100%'}} id="width3">
        
        <div className="booked-weather-custom-160-main">
            <div className="booked-weather-custom-160-date" style={{color:"black"}}>{date}</div> 
            <div style={{marginRight:'12px',marginLeft:"12px",display: 'flex',marginTop:'5px',alignItems:"center",justifyContent:"space-between"}}>
           
            <a target="_blank" href={file} rel='noreferrer'>
                        <img src={img}  alt='' style={{width:'100px',height:'100px'}}/>
                      </a>
                      <div>Weather data not available... </div>
                      <div style={{display:'flex',flexDirection:'column'}}>
              {sms_sent ?<Chip label="SMS Sent" avatar={<Avatar src={smsIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px",}}/>} style={{marginBottom:'10px'}}/>:
            <Chip label="SMS Not-Sent" avatar={<Avatar src={notsmsIconUrl}  style={{borderRadius:"0px" ,width:"20px",height:"20px", }}/>}  style={{marginBottom:'10px'}}/>}
           {nasa ?
           <Chip label="Confrim By Nasa" avatar={<Avatar src={nasaUrl} style={{borderRadius:"0px",width:"20px",height:"20px",}}/>} style={{marginBottom:'10px'}}/>:
          ''
           }
           
            {species.map((item) => (
                     <Chip label={item.name} style={{marginBottom:'10px'}}
                     avatar={item.name==='smoke'?
                     <Avatar src={smoke} style={{borderRadius:"0px",width:"20px",height:"20px"}} />
                    :<Avatar src={fireIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>} />
                          
                        ))}
            </div></div>
            

        </div>
       </div>
    </div>
    </div>
             
        </>);
      }else{
        return (
    
            <>
               <div id="m-booked-custom-widget-35390" >
    <div className="weather-customize" style={{width:'100%'}}>
         <div className="booked-weather-custom-160 color-009fde" style={{width:'100%'}} id="width3">
             
             <div className="booked-weather-custom-160-main">
                 <div style={{display: 'flex',marginTop:'5px',justifyContent:'space-around' ,alignItems:'center'}}>
              
            <a target="_blank" href={file} rel='noreferrer'>
                        <img src={img}  alt='' style={{width:'100px',height:'100px',borderRadius:'13px'}}/>
                      </a>
                     
                      <div style={{display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',paddingRight:'50px'}}>
                      <p>{date}</p>
                  <div className="booked-weather-custom-160-degree booked-weather-custom-Cwmd03" style={{width:'60%'}}  >
                 
                      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} style={{width:'40px'}} />
                      <p style={{color:'#2c3e50',fontSize:'14px',paddingLeft:'10px'}}>{description}</p>
                 </div>
                 <div className="booked-weather-custom-details" > 
                 <Tooltip title="Temperature">
                    <p style={{marginRight:'15px'}}> <IconButton style={{ color: '#868B94' ,padding:'0px'}}>
                      <Avatar src={temp} style={{ borderRadius: "0px", width: "20px", height: "20px" }}/></IconButton>
                        <strong>{Temperature}<sup>°</sup>C</strong>
                    </p> 
                    </Tooltip>
                    <Tooltip title="Humidity">
                    <p style={{marginRight:'15px'}}> <IconButton style={{ color: '#868B94' ,padding:'0px' }}>
                      <Avatar src={humidity} style={{ borderRadius: "0px", width: "20px", height: "20px" ,marginRight:'3px' }}/></IconButton>
                      <strong>{weather_data.data[0].humidity}%</strong></p> 
                      </Tooltip>
                      <Tooltip title="Wind Direction">
                      <p style={{marginRight:'15px'}}><IconButton style={{ color: '#868B94' ,padding:'0px' }}>
                      <Avatar src={compass} style={{ borderRadius: "0px", width: "20px", height: "20px"  }} /></IconButton>
                    <strong >{windDirection } </strong></p> 
                    </Tooltip>
                    <Tooltip title="Wind Speed">
                    <p><IconButton style={{ color: '#868B94' ,padding:'0px'  }}>
                      <Avatar src={wind} style={{ borderRadius: "0px", width: "20px", height: "20px" }} /></IconButton>
                    <strong >{weather_data.data[0].wind_speed} KPH </strong></p> 
                    </Tooltip>
                </div></div>
                      <div style={{    display: 'flex',flexDirection: 'column'}}>
                      {species.map((item) => (
                     <Chip label={item.name}
                     avatar={item.name==='smoke'?
                     <Avatar src={smoke} style={{borderRadius:"0px",width:"20px",height:"20px"}} />
                    :<Avatar src={fireIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>} style={{marginBottom:'10px'}}/>
                          
                        ))}
              {sms_sent ?<Chip label="SMS Sent" avatar={<Avatar src={smsIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>} style={{marginBottom:'10px'}}/>:
            <Chip label="SMS Not-Sent" avatar={<Avatar src={notsmsIconUrl}  style={{borderRadius:"0px" ,width:"20px",height:"20px" }}/>} style={{marginBottom:'10px'}}/>}
           
            </div></div>
                

             </div>
            </div>
         </div>
         </div>
                  
             </>
          
    );
      }
  
  
}

export default LiveWeather;
