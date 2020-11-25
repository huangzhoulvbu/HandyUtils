cd /d %~dp0
xcopy /s /y include\* "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\VC\Tools\MSVC\14.16.27023\include\"
copy lib\*.lib "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\VC\Tools\MSVC\14.16.27023\lib\x86\"
copy lib\*.dll C:\Windows\SysWOW64\
pause