import React from 'react';
import { Tooltip, Chip ,IconButton,Avatar} from '@mui/material';
import '../features/events/weather.css';

const wind='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFElEQVR4nO2Za6hVRRTHf6beLoiFWZL28BFEUlSYKJRCRGQmlBXFJaESIulBkOWrF9oXg0qIIrIPlRaUlilWgg/soVBilhUVRqKVqaio9DLT68SCdWHY7Jk153ROV8/sP6wve/Zae+a/16w1aw1UqFChQoUKFRQnAzOBr4E/gK+AaUAbGaAN+AhwJbIa6E2L45HA4rvkYVoc3xoEyHZoaew3CNhNi+N7g4DNZB4DHiKDLPBhYPGrgF6F908BLgVOpcXOAdMKi58eSIEnAWv1nX3ARmAR8BRwN3A1cN6Jmj6dJ/KnQzgL2GtsHacB9nNgcYGgYUAPjkM4T04PvDMAaAduSCAgJr9pil0KzAPuB64Dhqv9boHzZFDJ+AjgZ52s4OX/SEJIjgG/AuuABcBs4HZgjHpf07zHeTKkMNYB/KljPwE9gf7A700iISaHNH1/ADwPTAUmApcAfRtFwPle0Jurf8Ufn6DjzxiT/QUYD0wGngBeBJZr8NwJdDaBoD3ABuBN4FHgtHoIuEhT3fuBj9ynOhckuPOZkW/2UrceBcxqksdIML6xVgI6gO8C7if70ccWYwJiKwXtGhxDdmTsSuA2dft5+pclVvyocwvpHgGuqYWAIyVGJDCNLtGztsELpOMtw5YQEMPYyLbaAfRJJaAonwUyg+AmQ3dNDQRMNmxJ0LOwPKI/pR4CXjNy83Bj0ltrIOAyw5YENwsdEX3JHMkEHNW9ZqF/QhBKxRmGLTmBWhgS0ZdtHIT/4j/AuMRJ9zYmLfGEBtmSeVloj+j/HVMsvvyeURN0oY8xaTlApaKvYUsOXhb6RfQPxhTLFOS8PtT44KAGdpXONWxtS7AxMqIvLcCaCOjad7H0c0UDu0rjDFvRIJbQ5HmpHgK69t69Ab0phu47NRDwuGHrwYQGz/aIftk5ppSAXREGixcm7xqTfqwGAjYZx+pzSsrzi7U2uQt4PaL/tvVx58lULSQ6A60yP+JaFaGUsSkYXFJ0FY/Csoj1+pcPG9/15YuUNp7zZIY+u77kfC57DG/cygC+x7RpoLscuBl4QLtFC4Eva1hQqsjWfS61THYBt71Qiw2nDVS/3/eJMYEDWlFu1mzgmiCd2qiRK75XNY5MUpIlJSbDefJkYUxq6vkFg1c1aUGh/C1uvAR4GrgHuFb7Fg27xHWeiFvGIC71Q4NddateyM7X2+pbNafLUft/gfPkWePdhXUsMtYlLt4/dAtcYtl5Z2CBhwt/UQLpLVrhnRAXKc4TWUAZBgIr1QPmAHdoE+Ls47XXXy8Br5AhnCdvkDkBi8mcgGVkTsAKMidgDZkT8DGZE/ApmROwicwJ+IbMCdhC5gRsI3MCdpA5AXvIEK7QgsqagL/InICj3T2ZChUqVKhQgabgX91lduHTgQ3vAAAAAElFTkSuQmCC';
const humidity='data:image/png;base64,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';
const smoke ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nOWUzStEURiHn4WNYskOW2z8B8pKaSiFSYoZsbCysZ8VZRZKliZZMIWNZiMWJBYIKcpsTRYI5XPhu1O/W7fTmTu5d8dbb73n/fg959577oH/Yp3AFvAs3wTawoo1AqvAPfAAHAHfDv8CDoAn4BbIArWlxJs0YIu9AYvAsDyrnN13DdQEAbbUuA0kgEFgAhgCYpYb0LhqI8CZZheCAB9qijsEYyU8odmrIID3ehIhAP2avQsCbKgpHQKQ1ux6MfG4TsYnMBoCMOY7XV0uwKkaZh2P3q7YOy0x5Xqt3iXVT1yAFxW7fQOXyiUdgKTvX/D6e1R/dQH2VZwHOjRwrlzKAUgpPvQBppU7dgFatSPTMKWBNa0zDkBGcU7rSV/dfE+KQfa0EzM0Z4n4ATnrm80ABWCAX1ifRJa19gDGVqzdlhPCWiSy4wDsKm4mgjVIJO8A5BXXRwHUSeTCASgoDrw9S1m17xq2ATeKq6IAKiXy6AB4F2NFFECZRN4dAJMzsen5w/YD6RmxVe82ZCQAAAAASUVORK5CYII=";
const notsmoke="data:image/png;base64,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";
const temp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMUlEQVR4nO1bTWhcVRS+tT80M/f7zn0zSWiSppo0TZo0/bPRVtTa+rPShV10p7hQEATRTcFNFbsQqSAFoZsIUkwQBFGUWlGDPwU3KrUUKxYUUUHQXdtJWqW9ct68N30T2zSRTmbezPvgbObN3Mn5zs/97uQeY2oI59wmkodIOU7yC0BeIrnWtACWAjhMsiQi/4iIF3FeRP4mZdo5tz/5ZkCeBfgrKV9Za4cTj1aSfAHgbwCnYyPlDMmnjDE3mUYEgMMAzzvn/GxTMvQZIPui9w6qgyQHSD4NyMfRMisBfG0tzuVyOd/W1laxfD7v9XWA7xhjlphGgiunfSnpdE/Pat/d3VNFBCmlXC7XBWAHwJMaTRHZBfBbXYfk8+pk7LSSUCbiChkAz4nIXtNIIHlI0z52tLd3jZ+YmPDj4+O+q6u7igAAz6jjJN8D+DMpf1krD0fr/JLL5UNHrcV5LRFreQbgH9bakJh83nqSn5pGAinHNc3jyKvzMzMzoR08+Irv6OhIkvBm9LElAIZIFuJ1AJbKkc5ppH9PfMUyLaE4IwCcMo0EgCeS0Z+amqoQMDk5GZIS9wJS3p9jnZk49QH5KfnMWr6qBGlDtJZPmnpBRLZpDapFqbtsMQiIvnuLZo2pJwDZB8jbkU1qCi8WAQ0LZAQwywBX+xJYAeBRa2VP3YUQgIcWuwkCfBdAyVqUAHnZ1BHLSR6pURM8f4UA/qlR19eDIBCAF2JJDPB700jAjSPgh/gMEOn+i9Fh6KK1djoi4LJmg2lGAqyVJ6zF2ZiE2Qei6CxQstbdY5qRAFOWx5NaCprqsfTV80E+bzXyepZ40dQTUkMlGEPXtRbHtCSiw9BpPQZb6+429QZqqARTC2QEMMsA10olgBopwbRgea2UYGqBjABmGeBapQRkEZRgQwPXUYLFYoffff+Dfs/ex0K74657faHY3jwEXA1JApwr+MHR2/2m2+4Lbe3QFu+CQkaAyzLAtYYSdC1QAsvnUoKtQMB/kBGALANOtEwJyHWUYNMTgOsowaYn4GrICECWASeyEnAt3ANInlwAAUdNE2GFtXxD/2cXX5ObBwHTen+4Ya+8LgArSPl89g3RkIANCQLWb/XOBeG94St3BfXaLN5KNQnW8kjS+XIGFHzX6n6/cWx3hYDRbbv8qu6bvYQkSBUJInLApBEkH0hejBYJvAuKfmh0e8Xx2bZuZCwkSLMhUQ5K4GaTNpDyY5zS6kgQFP2GrTuv6Xxsw5vvjEiofPYS6T4zaQLJMVLOJet+rsjPtoHhWxNZEN4dni4UCqtNWgDggA5BxNHv6OyZt/OxFYodlX5Ayllr5XGTFpCcqkQ/CHz/4KYFE9DbN1zZFaJhitdNWkDK6ao9P7Hlzdf6E9pADZBjJi0g+V0cvSBQAuZf/1cTR1EZfGjSAlKOVjIgKPi+dZsXTMCavvXlrTNqhADHTVpAcr+IXIjrt3NV7/9ogp2VHqBNEMAjJi3I54NRHVxKiqChjTvmn/7rdRusSv9pHaQyaQIpp0TkcuxEELTPXwgFhcoWKOIukfKBSRusdTtnS2FVg4NzCKKB4bFQLicFlEpha+2ISSMQTolKggQXHnjaO7v8LQMb/cDwttDpNf0jvti+KtQM1SdCHaErD1KmFUtF5JMkCTERWuOaEbpNVh+Vq+YHD5smmRd+rfyDiKv0hGtZVPMlMniu7lMfNxIAtgPyjXb0aFDaJ4anw4hHvwR9pLuIaVaISJ9Ohet0KClfRuPzEzoHEARBb73/vhj/Anb80whzrmuNAAAAAElFTkSuQmCC";
const compass="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB8UlEQVR4nO2WuUpDQRSGP7S0FdwRLYxY+BR2Lq2inZXRiBLwQaxcsFMbVwSNhY8gglXEd1DQaKGJMXLgvzBcvMnMNXb5YCBk5qxzzpkLLVqEMQDkgGvgAXjXst8FYAXo5x/oA3aAClBrsKrAETDYLOMzQEnKP6R8FhhxjGaAOeAE+NR/JjP9V+OrisgUHusKGmGRnzrZsCtLHXkV+ALWUsjnJV9Nk4k+J+3rKYx3qBjz0vEK9IQo2JOg3WkIbcAicCsnjHPpsiL2YkBp/wis5AngXsbMiYghFWZFmfUqvJqKzoeMOiPqCHOiPXbmTHvLPgoLOmxtVY8uYOuX2WCZiDOvvUsfBx6d3q5n/AnY1/qWzFXC+VHt28RsSMmJJoktGY44UCbGEs5H+krNcGBMxuIOmFM0w4HHBldwpf1vGT4EnnUtNOMKCnWKcCJWcBVFXs+4sRBShCsJbWhD5s4xfgOM+yh0htGSz+F+RfYZG0SLTp//1mpJDAPlkEFk7MqYvWporN7KCctECBfStR0i1Ot0Q15ZiWZ7CBvS8QJ0hwpPO89pPqXxSH6SlOScD5JzPSw+dx6lvaqi/hNTes9rKswzzfaot2v6vSAny07aU0cepxPY9PworejtD/oA8cXaKKtpWATetIoaMtmQVmvRwvgBEDW49iMXs30AAAAASUVORK5CYII=";
const smsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO2Wu0oEQRBFTyiigcL6+ALxEbmZgqaKmaipifgbvvA3/BBNBDEQUcFMQ9fABdFVd42UkoZSirV3nJ7pmUD2wk2aun3o6scMxNUosA9cA+9AC7gAdoERCtIa8AJIBz9rTVStAJ8JUFG7mtVY0EHgMQVU1K4rwzHA23+AHoBpYNaM7cUAnyVA68Ck1lXN+FUMcMtMOKOAunpKayZ05d91b3aCJeA+YK/6NfdqxlxLUWAnqLSDawFQ5zHNXbbtpwORABXN/EgCvaG5Hc9hqqp9UNFMZvCh5oaARkCuAVTygJ3nAh+QD60lL/gGGDDwpCfzCVj2XQvJ6GMDr+gHwR2epl61c2Ar6bWSHL4F5skoieAjYBMYB/qAnrLA4nEX/EvdVsu/P1y1AqB3acCLkeEOupAG7JOdqGn+nwqXGK+XBcVADyhZJ8Ap0Fs2uDB9AWkG0AT7/d55AAAAAElFTkSuQmCC";
const notsmsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD+ElEQVR4nO1Z30tbZxh+Jk4obGN11LW92G4L62AwbFxmL7rRjMSyUSYipVDopQ6sA29su9vdtqAwdtNRhRUp/QNmMqoXu6mgte2JpjraZpizuNXFeM73nWTuHe9njibxpO2JJ03GzgPvTXjhe573e399J4APHz58+PDxP0MbgKMAPvTY3gfwNoBXakH6UwA/AjAAUI1NALgJIOIF8VcBjAD45yUQJwe7BmDfXgR8WyfiVGSj1ZJ/D8BmAwggAB/9V6NPe7mFmQYgTgVLVCMg1QDEqWBmNQLyDUCciuw1twKowexNXwD8G4CfQm5Q75Qhv4hR/6iT30ZRo4i2tLRQJBzWJ27cmJ+fm7uffPJkaUHTFn6OxeYvDAw8bDtwYLMhB1lTUxP19/UlNjKZ1ZyUVMksITajk5PxQwcP5qoV4Plb4K3W1nxicTGhSJomrUWjlLx8mZZ6eylx8iQ9PH2aHvX1UXp8nEQ6rYSYhrH2WSjEi+UbbgWkvSb/dHX1Nya1PjtLy2fOkNbeXtEWTpyg9NgY5YTg28gZhvGFWwHzXpFvbm4mO/Jrk5MU7+x8JnmtyJKXLqnbsoRYtyyLv4a8MEa8EvD14OCyHXk35LWCpa5c2aoLKafdCPjYq26jCtY0d6VNoquLtEBgF+HFcJjiHR07vwUClL13T4nISxl2I2J8rwK6IpHfVepEo6XkT51ShP6KxSgeDO6kzMWLKmX00dES/8dDQ3aHGnMjgCs/uhcBNycm7vLB3G1KIh0IKFG2OBaRHB5W5IWu01J3d2lRHz9OVibDtfAnXKIJwFcA5qoRcHd29gGT5FZZnirxYHBbBNfHNnkHXzY7jYhoP6rEOwA6AXwJYPoFBGzqqVScD02EQo6k4sHgFvnCbFg+e7ZiMa9NTSk/KeUReICx55C3APRaUv7Eh/KQcmyTw1tpo6wonZx812dmlI9hGIdrLSALIMROOSl/4EMf9fdXJC90XUW+vCZK/I8dI3NlhWsgT0TNtRSwAuAD28kS4jyT4vWgvFXmynKeSXNXYn/u/cX+LLAwC27DI1xzIK8BeLfYibLZNo4a7za8HmznfkcH6SMju7oNi0hdvUpLPT0lv/9x65bdRge8EjBYRj4GoNXJ0ZLyO3UL16+7nsJaezv9eu7c1johpU5Er3slYF9h3fgFwDcAKuYlbWwc4v7NixnvNm7IL4bDZCaT9op9HvVCXohPeKvkSKr8dlghNIfI2+RzUn6PekNK+bklRJYJ8VB6PDSkJmx5t+GCVTlfaK1Mnoj436L6g1di3iq3X16ZjBLDQ2r9zh0yU6mdV5mUel3T5lnISxnhxcwS4mnZU/JvbpU5KS8Q0XO/SP8LN1KB3Fu5O70AAAAASUVORK5CYII=";
const fireIconUrl= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACxUlEQVR4nNXXTUhUURQA4IcWEQRh4HvnPC1aZG2KQGjROtoEQRgF/RBtCoLaVARRuEkN2uQmyGVREBJBBKaSaO/cceWiVdSun02OFo7z53vn6pH7xrGx+fHNOCN04MDAzNxvzn33nMtY1v8U/kfsZIIfrODEpsLaw3NMkGWCjCbn+qbB7OFTrXBRK5SAIMMxPNVwVIb2bWPCeYPmkxUmxYPWhsJawUVdDC8w4UDDUJls384KfxWiqzhhVsZbdzQEXow5PawwVQrWCuaY3JN1R/2Yc5AVpEujYS4yQW9dUZmytmoFX5lwqQIs7MFLmWrZKbSnpS4wK+hjqljtCozPzGe1gk8iVtOG0CAGRwIPMuuhmnCJY9CrFX5mBYEm5+yGtpgVfltvi1daykyyL/lzwAp+yqDVXBOsFd5hKn2KgyGUdA8UwGaEYrKgvZI1zXLxoLUcGi48AjLt2JJ+CGW3XhO8raFat9tUUQ72n4NM27bEd9vivyiNmwMp49aW6NWK1cQK45We6fwVJ4RNzh6yhUdLPvek6f/IcKDco1pBolK1ptI8bDJxubhq9nBeE56vYpvxRqAwWw6d6ViLhgm2LLwqqtjXBLciw6zwgVbFLZQdQInvLYGu5FyX8+8PXTJrRa+Y4HZAGKxBn4DE3fJoeNBcW3i4oMUIfa3gZjXwGSZcfcY8jjKzvzKaz0x/4bOGBCs4HRmWyfZdHPvbStn+XOtEyVT3mooXqr4wNMGIVqjNAqn70eHM4xzMBFoTvq8KNSHKPZC/kTKPIsKuLcHw6ghNy0Rbh1VLaA+umbFpFou3rQ8nLuROdThqY3i1JjQfmvCuWSjdV7nq2cOO8AcIx6T5jlWPYMLj5p+D/wb8xCVHfnfmZrRJ8zp1D4QnwtvoO3vuMaueIYNWMxN0BWP4LhiFP8EEavaQgzGMa8LX5r2a79/NjGUCteYSJ/MuowAAAABJRU5ErkJggg==";
const nofireIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEpUlEQVR4nL2WfUxbVRTAQUih6AYDZTMDiXHRPzZFSWBIQP4AI4yQUZcI/GFGjLhkS+Y/ZTH7MMQlzgVJCDFkZsuyBaPZMiPLWNjmJjBQCAosMDpaPiYt0Pad0w8GUnvf5jHnda08aYGa4U1O2vvue/d3z+c9ERFhDHI64wXAPq8kVfP/iP9jkMuVIANMyoikCMAk2e1b1h0sAPYx8M2sLMrMyCDX1BTDfyEizbqCZYB6t9lMrDzLezqdT3PEuvUFI/Z1X7sWALN8VVdHAuChV5LeWBeoQMxm7T6qqlKBN27YQFN377LJe4noqScKJaJIGaBr1mikOK1WBWap3LNHMbkX8YN1Car3y8uXQf3y8/XrDB8joqgnAvXY7S8JxPm2S5coMjIyJHj3rl3+FNtNJlOMjKh7KEkVhLgxbCgRRXG6wMQEvZCSEhLKEhUVRRaDgQRiiwwwtCTXh8IuNAKghj8u1+lWhPql4cQJBSYAqCA/n97KySGvJPFhjoZrYs/3zc1rgrK8W1qqgDtaWwPP2EUC4P6aI14gfseVaUty8prBL6alKeB3CgqWRTyn46pQr93+ugD469NDh9YMZXk6Lo6O1tSoniXEx9Oi1cq+/nxVsAzQOGexKMUhHHAouXn5Mmv924pQIooWiLZvTp/+zyCtVkspW7fKSYmJj3j+2eHD7GdBZrN21dLIgRIWLDaWjuj1I78PD9+QAYYFoiQjjs9NT3cP3r7dJSNOCIcjJ7R/HY4PGZyWmhoS8vzmzXSmsTEwT9+xwyNNTv7IceG1WMjV2kp47hw5LlygxeFh/w1mkhHfDq0xwCf8YmxMTFDos0lJNNbfT1cvXlTmr23f7vXYbP3CbidbQwON5uaSITNTJVP799PiyAhH9kLI6BaIHzN4U0LCikVioLOToqOjyWo0dsiSROaDB5cBl4qpsJAWh4YYPhu0jMoApbxxRnp6UPB938cLXJ2+bmgw810snTq1ItQvE5WVxIeUAWqXR7XDkSoAHh3R64OCuQOREZsE4oyM2MwmNhYWBjZ3XblCc7du0Wh+PllPniTP+DiZiosD6+62NuUWC+XntvHBQYrRaIJffwA9QpLyhSTdXOjpUWklNTUprlg0GHy/d+6o/D772FXkdicGM3cBRyjn37/B1Xv3+qJUkkpkxF9ZA5VJs7Jovrvb/w6N6XSqdYter6z9CfBKUK1lgDMem41Ki4pUYI1GQ/0dHexnm0D8ab6rS7WxXyOvzyXKIe7l5ATWZ44f92k8O/tcUDDZ7c/wXTw/M0NlJSUq+MvbthG3QQLgW2G1Kv70b/ygvZ3+GBggU1ERwdmzJGw2MpWW/hMDLS38nZnbqaBgBe52b2I4R/AXtbVKdfLDua8WkvQDu8RWXx/YmLW7l50dmC/171hZmXIQGfHLkNAA3NfGNDFgbGCADlRXK5UrNzvbXxCustaTVVUrptJoXh4t9Paytq6QZg42hCTlyQDdgZbGJ+PkdKbJiEbv9DRNHztGhp07l+dvRQUt9PUxVJYdjuI1Q5cOr9P5qgA4wDXd30uR1ZosENuV9BkZITx/ntj8nFoPOjuV6H58aahq9d+mai6VGOYbHgAAAABJRU5ErkJggg==";
const nasaUrl="data:image/png;base64,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";
const notnasa="data:image/png;base64,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";
const station="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAElElEQVR4nO2aW4hWVRTHfxNeijTTmszEF5HIS3b5RAnswRSKIrPyWbEepFKQfErwrdTE0UnHS0Zk40PReAHpIXQsLxRoQTJq+WJQloFZ3qZ0nIuxYH2wOZx9zt7n7K85zXf+sODwnb3XWvt/9lp777U/KFGiRIkSJUqUKBGLh4H3gFNAJ/APcAbYDDyCP14FrgG/AruBl4CGGvjZqc/NwJQsCocCW4Be4JZF5N024A4PnX/G6DkKjMnipKOfPUALMMRH6ZcJCqPylSMJcxJ0/AQ0Zhi8j58HXUnY6qG0KtInDctTdHzuSYDp59/AamCyEnMP8DJwPGJjk0ss9XoM/CbwM3AEuDdF94cO+p50HLzp50XgMUu7QcAHkXAQkqxotjjWpwN4A5gLVID7PRPYfgcCtjvqMv18PqWtkPCt0X59UuPTFsfWAU8Aa4Am4H1gB/AZsA84AHwNfAf8CJwFLgB/GavFNw4EyAojGG95/2DEzw5HwuYbOk4mNbxqMfyAJqpbGaQ65Toc2soSKbjT8n5YxM/UmFY0GjquZiFgrH7VLARMqiEBkvhccLsrAacthjfkCIGpNQyBXY4ETHUNgeYE51qBpcALwDTdvIROgkKsC5qNGZO2+gjWuibBKbpU9NcyONORANPPT1I+hKxY17VtjxGSVmzOEOfSJ+9GSELJBy1G308tO8kXI9tvOS+kYohuG10H365JJs9W+KzjVI762W7o6NQD1lol51TEhuSpwT7KW1LCoVe/vMvgkw5Dh4DRnoM3/dyU4mePfnnnwZuYrEnjpCYcOQ7/oEZlO5r1OHwOaAPmBToOR/28ps9NLjHf37gbeJM6QwPwtE7NP4CuQDPhf4PRMbF6H3WESgwBj1NHmBtDQNqxdkDh9RgCXqOO8E4MAW9TR9gRQ8BH1BHaYwiQreqAwG3ABOAZYInWEtq0hH0C+AXojiGgW9+d0LZt2neJ6pqguguHYcBzegiRO4IrGU6TrnJFyXkXeFYrR/2CEcArOpW7ajjgNOnS0FmkPtUcM3VqVgsMRZLrWqJzLap4Y6yHMz1aBN2lobFY6wEVreuNA0ZqzX6QPo/TdxVtu1j77taTnU+lSnwNjnkJBrv1XL8SmA0Mr4H94apbbBy2JNKqiK/BscpiTCrFo/jvMUptx/kkvgbHQYsxqRCHwKMqPphm8UmSc1A0AJcsd4Z3BbKxQcV3Ce6L8ety6D3DRAvTUtoy4Zu5b2rCGqwXKRf0WWoDNxL6mThnafNQSAIWWozsz0nAzpgEW01gOx0JOGBpsyAkAS0WIxsj7Xr1Oux3LXV36HWZxOQXuk636g1Qk3FxutfQKc/oLKjoJch4rSKNjJnaGy2+ic/BcNxiRM71edGooWCGRWPO2oLIMQJhaEI8zgqgf1mMXvnNFU8lbJPF99yYkRCLWf/dZeL7GL3ymyvGJPg3PYB/LM2Q3IoicpTOjdYCDCSrfByCgDMFGEhWkT9r5MIIz7/NFU369OotM+YUYBB5RU6QmbGiAAPIK2/lIWBvAQaQV/bkIeC3Agwgr5zPQ0CJEiVKlCjBwMW/GVjDIfFDSEMAAAAASUVORK5CYII=";
const right="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkElEQVR4nO3XsQrDIBSF4f/1QpcMSof26WPfwkK6OIVmjif8H9xRuEeRqyBJkqQrLUAbtRKoAfuoDjwJDrAnhlhH09Ehyp8QX+BNkGKISRRPIvUkHsDnsGDG6mcT+zhQZq7tlgGWkBA95dFXTy7xiwDV5i9S3fmL1OSdX9M/NC25+Vt86pcRYkuZsJIkSUziB0TBElKM+4d4AAAAAElFTkSuQmCC";
const airhumidity="data:image/png;base64,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";
const airtemp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvUlEQVR4nO2ZTWsUQRCGX/QgBo2aRXOIIoJ486qCJ3+B5EM3BxFU8OQPEDEIqygI3sVfoISYkEAuOQQ9BcWgYqLxA/xIyMEEs4kSFGSloISdsae6Z6cqm8a8UGTJdFX1M91d09MDbCg+PQFQ89jEGvXlJIByo861QLPWNgCfACwAKMUMcqcu191YQQ4D+FWX6zeAo1YgllDjjhyPYwM5JuQ5bgFipQdCzvsxgSwKOamCBavZ66Mq5FqKCWRAyNVvAWKlQzyF0vloyh2MCYTUwYu+ytafFwJCh7Wh9sJYawFCd/drI3fZAqSIRjnGGCIG6U3FKWOdTK082g5gNuU/D2CHMoOzw5ogNzNi3FBmcHbY9/9Q0V3/lgFSBbBTkcEU5Iqn8l1WZDAtvy89MZ7HArLqibHaLJC8+uABea/IYApS8YBUFBlMQVr4PMwFMcHXVUSBrucAoTu4tYEcFZ5GP/lvRYAo533y0+btlWchu669AHAANirxewlZeyjEfEBFyrr+BcB+A5B7eQ4daEinA0ur7xmwRRHiCB/K1ec4ITnc8nQwFITsmhLEJgBPHfHpgbrZ5bAbwA9FkGWl/dIZIcdZl8MlT8feAuhOHfFPeXwuKozGlBB/mtskNCI4vOMRS6sNwIzgN1gQpDNg5KlNQp+FxqeFZKcEv48FQYYDQIbybOJco/FXeww3fosBIP8cmy4LjVs9L0jSgi+ilcCikpA017uEZD2C35uCII8CQOjbSUJDQuOZjO92bVwIsvweFgTpCgCh6pnQBY/DLC/6VrYeDwTZOeh+O6yl7LbLoeQ5ws9rSzxiGurkKfSdbdw1EvXqUwShw4WmqQXApALEswbeTdS1D8BcAYg5jrEu1JGx46wFbN8t3kUKT7OrgQWgymui6dNJElWe87wBfM1P2xX+PcgldpcYYUP/of4AZh8bbk3MfAoAAAAASUVORK5CYII=";


function LiveWeather(props){
  const windDirections = [
    'North', 'North-Northeast', 'Northeast', 'East-Northeast',
    'East', 'East-Southeast', 'Southeast', 'South-Southeast',
    'South', 'South-Southwest', 'Southwest', 'West-Southwest',
    'West', 'West-Northwest', 'Northwest', 'North-Northwest'
  ];
    
    let weather_data=props.data.weather_data;
    let weather_station=props.data.weather_station;
    //console.log(weather_station)
    let species=props.data.species;
    let speciessize=species.length;
    console.log(speciessize)
    let img=props.data.thumbnail;
    //img= img.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    const camera=props.data.camera_name;
    let name=camera;
    if(camera.includes('PTZ')){
     let nameC=camera.split('-');
      name=nameC[1];
      //console.log('name: '+name);
    }
    let air_temp;
    let air_humidity;
    if(weather_station!==null){
     air_humidity=weather_station.Air_Humidity
     
     air_temp=weather_station.Air_Temp
  //console.log(air_temp+" "+air_humidity)
    }
    const date=props.data.date;
    const sms_sent=props.data.sms_sent;
    const nasa=props.data.nasa_tag;
    let file=props.data.file;
    //file=file.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    // Calculate the index in the array based on wind degree

  let index ;
  let windDirection;
  let celsius;
  let Temperature;
  let text;
  let description;
  let icon;
  if(weather_data!=="N/A" ){
    index = Math.floor((weather_data.data[0].wind_deg / 22.5) + 0.5) % 16;
    windDirection = windDirections[index];
    celsius = weather_data.data[0].temp - 273.15;
    Temperature =Math.round(celsius);
    //feelsTemp=Math.round(weather_data.data[0].feels_like - 273.15)
    icon=weather_data.data[0].weather[0].icon;
    text=weather_data.data[0].weather[0].description
    description= text.charAt(0).toUpperCase() + text.slice(1);
  }
    if (weather_data==="N/A" || weather_data.length === 0) {
        // Handle the case when weather_data is empty or undefined
        return (<>
          <div id="m-booked-custom-widget-35390">
<div className="weather-customize" style={{width:'100%'}}>
    <div className="booked-weather-custom-160" style={{width:'100%',border:'1px solid white',background:'white',borderRadius:'25px'}} id="width3">
        
        <div className="booked-weather-custom-160-main" style={{padding:'2px 2px',borderRadius:'15px'}}>
            <div className="booked-weather-custom-160-date" style={{color:"black"}}>{date}</div> 
            <div style={{marginRight:'12px',marginLeft:"12px",display: 'flex',marginTop:'5px',alignItems:"center",justifyContent:"space-between"}}>
           
            <a target="_blank" href={file} rel='noreferrer'>
                        <img src={img}  alt='' style={{width:'100px',height:'100px',borderRadius:'13px'}}/>
                      </a>
                      <div>Weather data not available... </div>
                      
                       {/* {weather_station!==null&&air_temp!==null&&air_humidity!==null&&(
                          <div style={{background:'#dee4e9',
                     display:'flex',flexDirection:'row',
                     alignItems:'center',    width: '80%',
                     justifyContent:'space-between',alignContent:'center',padding:'3px',border:'1px solid black',borderRadius:'25px'}}>
                     <Tooltip title="Weather Station" style={{marginRight:'20px'}}>
                      <Avatar src={station} style={{ borderRadius: "0px", width: "20px", height: "20px",marginRight:"-30px" }} />
                      </Tooltip>
                      
                      <Avatar src={right} style={{ borderRadius: "0px", width: "20px", height: "20px" }} />
                      <Tooltip title="Air Temperature" style={{marginRight:'20px',marginTop:'4px'}}>
                          <p><IconButton style={{ color: '#868B94' ,padding:'0px'  }}>
                          <Avatar src={airtemp} style={{ borderRadius: "0px", width: "20px", height: "20px" }} /></IconButton>
                             {air_temp}<sup>°</sup>C </p>
                          </Tooltip>
                          <Tooltip title="Air Humidity" style={{marginRight:'20px',marginTop:'4px'}}>
                         <p> <IconButton style={{ color: '#868B94' ,padding:'0px'  }}>
                          <Avatar src={airhumidity} style={{ borderRadius: "0px", width: "20px", height: "20px" }} /></IconButton>
                            {air_humidity}%</p>
                            </Tooltip>
                      </div>
                      
                          
                       )}*/}
                        
                      <div style={{display:'flex',flexDirection:'column'}}>
              
                <Avatar src={sms_sent ?smsIconUrl:notsmsIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px",}}/>
               
           <Avatar src={nasa ?nasaUrl:notnasa} style={{borderRadius:"0px",width:"20px",height:"20px",}}/>
          
           
            {species.map((item) => (
                    item.name==='smoke'?
                     <Avatar src={smoke} style={{borderRadius:"0px",width:"20px",height:"20px"}} />
                    :<Avatar src={fireIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>
                          
                        ))}
                        {speciessize==0&& (
                       <>
                     <Avatar src={notsmoke} style={{borderRadius:"0px",width:"20px",height:"20px"}} />
                    <Avatar src={nofireIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>
                    </>)}
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
         <div className="booked-weather-custom-160 " style={{width:'100%',border:'1px solid white',background:'white',borderRadius:'25px'}} id="width3">
             
             <div className="booked-weather-custom-160-main" style={{padding:'2px 2px',borderRadius:'15px'}}>
                 <div style={{display: 'flex',marginTop:'5px',justifyContent:'space-around' ,alignItems:'center'}}>
              
            <a target="_blank" href={file} rel='noreferrer' style={{marginLeft:'2px'}}>
                        <img src={img}  alt='' style={{width:'100px',height:'100px',borderRadius:'13px'}}/>
                      </a>
                     
                      <div style={{display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'center',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width:'100%'}}>
    
                      <p>{date}</p>
                  <div className="booked-weather-custom-160-degree booked-weather-custom-Cwmd03" style={{}}  >
                 
                      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}  alt='' style={{width:'30px'}} />
                      <p style={{color:'#2c3e50',fontSize:'12px',paddingLeft:'10px'}}>{description}</p>
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
                   
                </div>
                {/*{weather_station!==null&&air_temp!==null&&air_humidity!==null&&(                     
                   <div style={{background:'#dee4e9',
                     display:'flex',flexDirection:'row',
                     alignItems:'center',width: '80%',
                     justifyContent:'space-between',alignContent:'center',padding:'3px',border:'1px solid black',borderRadius:'25px'}}>
                     <Tooltip title="Weather Station" style={{marginRight:'20px'}}>
                      <Avatar src={station} style={{ borderRadius: "0px", width: "20px", height: "20px",marginRight:"-30px" }} />
                      </Tooltip>
                      
                      <Avatar src={right} style={{ borderRadius: "0px", width: "20px", height: "20px" }} />
                      <Tooltip title="Air Temperature" style={{marginRight:'20px',marginTop:'4px'}}>
                          <p><IconButton style={{ color: '#868B94' ,padding:'0px'  }}>
                          <Avatar src={airtemp} style={{ borderRadius: "0px", width: "20px", height: "20px" }} /></IconButton>
                             {air_temp}<sup>°</sup>C </p>
                          </Tooltip>
                          <Tooltip title="Air Humidity" style={{marginRight:'20px',marginTop:'4px'}}>
                         <p> <IconButton style={{ color: '#868B94' ,padding:'0px'  }}>
                          <Avatar src={airhumidity} style={{ borderRadius: "0px", width: "20px", height: "20px" }} /></IconButton>
                            {air_humidity}%</p>
                            </Tooltip>
                      </div>
                      
                          
                       )}*/}</div>
                      <div style={{    display: 'flex',flexDirection: 'column'}}>
                      {species.map((item, index) => (
  item.name === 'smoke' ? (
    <Avatar
      key={`smoke-${index}`}
      src={smoke}
      style={{ borderRadius: "0px", width: "20px", height: "20px" }}
    />
  ) : item.name === 'fire' ? (
    <Avatar
      key={`fire-${index}`}
      src={fireIconUrl}
      style={{ borderRadius: "0px", width: "20px", height: "20px" }}
    />
  ) : null
))}

{!species.some(item => item.name === 'smoke') && (
  <Avatar
    src={notsmoke}
    style={{ borderRadius: "0px", width: "20px", height: "20px" }}
  />
)}

{!species.some(item => item.name === 'fire') && (
  <Avatar
    src={nofireIconUrl}
    style={{ borderRadius: "0px", width: "20px", height: "20px" }}
  />
)}
              <Avatar src={sms_sent ?smsIconUrl:notsmsIconUrl} style={{borderRadius:"0px",width:"20px",height:"20px"}}/>
           
              <Avatar src={nasa ?nasaUrl:notnasa} style={{borderRadius:"0px",width:"20px",height:"20px",}}/>
          
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